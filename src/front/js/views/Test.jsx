import React, { useState } from 'react'

const Cloudinary = () => {
  const [profileImage, setProfileImage] = useState('') // guarda la imagen
  const [imagePreview, setImagePreview] = useState(null) // guarda imagen para previsualizar
  const [isLoading, setIsLoading] = useState(false) // estado true/false para mostrar si esta cargando o no
  const [imgUrl, setImgUrl] = useState('') // la url resultante del response ( donde se encuentra la imagen )

  const handleImageChange = (e) => {
    //handler que rescata imagen subida por usuario y guarda en preview
    setProfileImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleUploadImage = async (e) => {
    //handler async que sube la imagen a cloudinary
    e.preventDefault() //prevenimos la recarga automatica
    setIsLoading(true) //avisamos que se esta cargando imagen

    try {
      //intentamos...
      let imageURL //declaramos imageURL antes de la condicion if..
      if (
        //Solo si la profileImage existe y es de un formato aceptado...
        profileImage &&
        (profileImage.type === 'image/png' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/jpeg')
      ) {
        const image = new FormData() //Instanciamos desde FormData a image que va a ser el body de nuestro request
        image.append('file', profileImage) //sumamos clave/file, valor/profileImage al objeto instanciado
        image.append('cloud_name', 'dspkak5d0') //sumamos el nombre que está en dashboard de cloudinary
        image.append('upload_preset', 'vanguar_vesture_preset') //sumamos también el upload_preset
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dspkak5d0/image/upload',

          {
            method: 'POST',
            body: image, //le pasamos como body el objeto image instanaciado de FormData
          }
        )

        const imgData = await response.json() //pasamos la info del response a formato legible por js
        imageURL = imgData.url.toString() //capturamos de esa info la url y la pasamos a string
        setImagePreview(null) //seteo el estado local que contiene la imagen del preview
      }

      setImgUrl(imageURL) //por último la imagen url la guardamos en un estado local para mostrarla
    } catch (e) {
      //si algo sale mal decimos que tenemos un error.
      console.log('Error uploading file', e)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2>Upload Image to cloudinary</h2>
      <div>
        <form onSubmit={handleUploadImage} className='--form-control'>
          <p>
            <label>PHOTO:</label>
            <input
              type='file'
              accept='image/png, image/jpg, image/jpeg'
              name='image'
              onChange={handleImageChange}
            />
          </p>
          <p>
            {isLoading ? (
              'Uploading...'
            ) : (
              <button type='submit' className='--btn --btn-primery'>
                Upload Image
              </button>
            )}
          </p>
        </form>
        <div className='profile-photo'>
          <div>
            {imagePreview && (
              <img src={imagePreview && imagePreview} alt='uploaded' />
            )}
          </div>
        </div>
        <div>
          <label>img url: {imgUrl}</label>
        </div>
      </div>
    </div>
  )
}

export default Cloudinary
