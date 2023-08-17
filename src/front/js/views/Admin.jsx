import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext.js'
import InputImage from '../component/InputImage.jsx'
import PreviewImages from '../component/PreviewImages.jsx'


import uuid from 'react-uuid'

const Admin = () => {
  const { store, actions } = useContext(Context)

  const [images, setImages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(4)
  const [name, setName] = useState("logo")

  useEffect(() => {
    selectedCategory == 4 && setName("logo")
    selectedCategory == 3 && setName("shoes")
    selectedCategory == 2 && setName("accessories")
    selectedCategory == 1 && setName("clothes")
  }, [selectedCategory])

  if (!store.user.is_admin) return <Navigate to='/' />

  const handleSubmit = (event) => {
    event.preventDefault()
    const image = {
      name: name,
      images,
    }
    actions.addNewImage(image)
    setSelectedCategory(4)
  }

  const handleImageOnChage = (e) => {
    const file = e.target.files[0]
    file['id'] = uuid()
    images.length < 1 && setImages([...images, e.target.files[0]])
    e.target.value = null
  }

  const handleDeleteImage = (idToDelete) => {
    setImages(images.filter((img) => img.id !== idToDelete))
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(Number(event.target.value))
  }


  return (
    <div className="bg-white container-fluid pt-2" style={{ minHeight: '100vh' }}>
      <h1 className="mb-3 pt-3 ms-5">Edit app web</h1>
      <>
        <form className="container" onSubmit={handleSubmit}>
          <div className="row">
            <div className='col-4 '>
              <h4>Category</h4>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='category'
                  id='logo'
                  value={4}
                  checked={selectedCategory === 4}
                  onChange={handleCategoryChange}
                />
                <label className='form-check-label' htmlFor='logo'>
                  Logo
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='category'
                  id='clothes'
                  value={1}
                  checked={selectedCategory === 1}
                  onChange={handleCategoryChange}
                />
                <label className='form-check-label' htmlFor='clothes'>
                  Clothes
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='category'
                  id='accessories'
                  value={2}
                  checked={selectedCategory === 2}
                  onChange={handleCategoryChange}
                />
                <label className='form-check-label' htmlFor='accessories'>
                  Accessories
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='category'
                  id='shoes'
                  value={3}
                  checked={selectedCategory === 3}
                  onChange={handleCategoryChange}
                />
                <label className='form-check-label' htmlFor='shoes'>
                  Shoes
                </label>
              </div>
            </div>
            <div className='col-4'>
              <h4>Images</h4>
              <InputImage inputOnChange={handleImageOnChage} />
              <PreviewImages
                images={images}
                onDelete={handleDeleteImage}
              />
            </div>
            <div className="col-12 mt-5 mb-5">
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
