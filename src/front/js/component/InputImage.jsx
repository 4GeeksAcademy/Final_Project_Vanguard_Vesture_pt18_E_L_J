import React from 'react'

import styles from './styles/InputImage.module.css'

const InputImage = ({ inputOnChange }) => {
  return (
    <label className={styles.customFileUpload} htmlFor='file'>
      <div className={styles.icon}>
        <i className="fa-solid fa-upload"></i>
      </div>
      <div className={styles.text}>
        <span>Click to upload an image</span>
      </div>
      <input type='file' id='file' accept='image/png, image/jpg, image/jpeg' onChange={inputOnChange} />
    </label>
  )
}

export default InputImage
