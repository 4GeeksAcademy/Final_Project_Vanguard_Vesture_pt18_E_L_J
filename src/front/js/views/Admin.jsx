import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext.js'
import InputImage from '../component/InputImage.jsx'
import { useNavigate} from 'react-router'


const Admin = () => {
  const { store, actions } = useContext(Context)
  const [image, setImage] = useState(null)
  let navigate = useNavigate()

  if (!store.user.is_admin) return <Navigate to='/' />

  const handleUploadImage = (event) => {
    event.preventDefault()
    const location = event.target.location.value
    if (!location) return alert('Please select a location')
    if (!image) return alert('Please upload an image')
    actions
  .updateAppImage(location, image)
  .then((res)=>{actions.showNotification("Image uploaded","success")
                navigate('/home')

}
  )
  }

  const handleImageOnChage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    e.target.value = null
  }

  const handleDeleteImage = (idToDelete) => {
    setImage(setImage(null))
  }

 
  return (
    <div className='bg-white container-fluid pt-2'>
      <h1 className='mb-3 pt-3 ms-5'>Edit app web</h1>
      <>
        <form className='container' onSubmit={handleUploadImage}>
          <div className='row g-2'>
            <div className='col-5'>
              <div>
                <h4>Location</h4>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='location'
                    id='logo'
                    value='logo'
                  />
                  <label className='form-check-label' htmlFor='logo'>
                    Logo
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='location'
                    id='favicon'
                    value='favicon'
                  />
                  <label className='form-check-label' htmlFor='favicon'>
                    Favicon
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='location'
                    id='clothes'
                    value='clothes'
                  />
                  <label className='form-check-label' htmlFor='clothes'>
                    Clothes
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='location'
                    id='accessories'
                    value='accessories'
                  />
                  <label className='form-check-label' htmlFor='accessories'>
                    Accessories
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='location'
                    id='shoes'
                    value='shoes'
                  />
                  <label className='form-check-label' htmlFor='shoes'>
                    Shoes
                  </label>
                </div>
                <div className='mt-4'>
                  <h4>Images</h4>
                  <InputImage inputOnChange={handleImageOnChage} />
                </div>
              </div>
            </div>
            <div className='col-7'>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className='img-fluid'
                  alt='previe image'
                  style={{
                    width: '500px',
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                  }}
                />
              )}
            </div>

            <div className='col-12 mt-5 mb-5'>
              <button type='submit' className='btn bg-black text-white'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  )
}

export default Admin
