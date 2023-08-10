import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import uuid from 'react-uuid'

import styles from '../views/styles/NewProduct.module.css'

const CATEGORIES = {
  1: 'clothes',
  2: 'shoes',
  3: 'accessories',
}

const NewProduct = () => {
  const { actions, store } = useContext(Context)
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [sizes, setSizes] = useState(null)
  const [newSizeName, setNewSizeName] = useState('')
  const [images, setImages] = useState([])

  const [isDragging, setIsDragging] = useState(false)
  const handleDragging = (dragging) => setIsDragging(dragging)

  const navigate = useNavigate()

  useEffect(() => {
    actions.getSizes().then((res) => setSizes(res))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const product = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      color: event.target.color.value,
      type: event.target.type.value,
      category_id: selectedCategory,
      // Sizes that have stock > 0 and belong to the selected category
      sizes_stock: sizes[CATEGORIES[selectedCategory]].filter((s) =>
        Boolean(s.stock)
      ),
      images,
    }
    actions.addNewProduct(product).then((res) => navigate(`/product/${res.id}`))
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(Number(event.target.value))
  }

  const handleSizeStockChange = (event) => {
    const sizeId = Number(event.target.id)
    const stock = Number(event.target.value)
    const newSizes = sizes[CATEGORIES[selectedCategory]].map((size) => {
      if (size.id === sizeId) {
        return { ...size, stock }
      }
      return size
    })
    setSizes({ ...sizes, [CATEGORIES[selectedCategory]]: newSizes })
  }

  const handleCreateSize = (event) => {
    actions.createSize(newSizeName, selectedCategory).then((res) => {
      setSizes({
        ...sizes,
        [CATEGORIES[selectedCategory]]: [
          ...sizes[CATEGORIES[selectedCategory]],
          res,
        ],
      })
      setNewSizeName('')
    })
  }

  const handleOnDrop = (event, image) => {
    event.preventDefault()
    const droppedImageId = event.dataTransfer.getData('imageId')
    const droppedImage = images.find((img) => img.id === droppedImageId)
    const draggedOverImageId = image.id
    const draggedOverImage = images.find((img) => img.id === draggedOverImageId)
    const droppedImageIndex = images.indexOf(droppedImage)
    const draggedOverImageIndex = images.indexOf(draggedOverImage)
    const newImages = [...images]
    newImages[droppedImageIndex] = draggedOverImage
    newImages[draggedOverImageIndex] = droppedImage
    setImages(newImages)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label h4'>
            Name
          </label>
          <input type='text' className='form-control' id='name' required />
        </div>

        <div className='mb-3'>
          <label htmlFor='price' className='form-label h4'>
            Price
          </label>
          <input
            type='number'
            className='form-control'
            id='price'
            step='any'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label h4'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description'
            rows='3'
            required
          ></textarea>
        </div>

        <div className='mb-3'>
          <label htmlFor='color' className='form-label h4'>
            Color
          </label>
          <input type='text' className='form-control' id='color' required />
        </div>

        <div className='mb-3'>
          <label htmlFor='type' className='form-label h4'>
            Type
          </label>
          <input type='text' className='form-control' id='type' required />
        </div>

        <h4>Category</h4>
        <div className='mb-3'>
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

        {/* Add new size */}
        <div className='mb-3'>
          <h4>Add new size</h4>
          <div className='d-flex gap-2 align-items-center'>
            <input
              type='text'
              id='newSize'
              style={{
                width: '60px',
              }}
              value={newSizeName}
              onChange={(e) => setNewSizeName(e.target.value)}
            />
            <button
              type='button'
              className='btn btn-dark'
              onClick={handleCreateSize}
            >
              Add
            </button>
          </div>
          <div id='size-help' className='form-text'>
            The size will be added to the selected category
          </div>
        </div>

        <div className='mb-3'>
          <h4>Stock</h4>
          <div className='row g-2'>
            {sizes &&
              sizes[CATEGORIES[selectedCategory]].map((size) => {
                return (
                  <div
                    className='d-flex flex-column align-items-center gap-1 p-1 col-6 col-md-4 col-lg-3'
                    style={{ minWidth: '150px' }}
                    key={size.id}
                  >
                    <label htmlFor={size.id} className='fs-4 fw-bold'>
                      {size.name}
                    </label>
                    <div className='d-flex gap-2 align-items-center'>
                      <input
                        type='number'
                        id={size.id}
                        style={{
                          width: '60px',
                        }}
                        onChange={handleSizeStockChange}
                        value={size.stock || 0}
                        min='0'
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Images */}
        <div className='mb-3'>
          <h4>Images</h4>
          <input
            className='d-block my-2'
            type='file'
            accept='image/png, image/jpg, image/jpeg'
            name='image'
            onChange={(e) => {
              const file = e.target.files[0]
              file['id'] = uuid()
              setImages([...images, e.target.files[0]])
              e.target.value = null
            }}
          />
          {/* <button type='submit' className='btn btn-primary' onClick={() => {}}>
            Add Image
          </button> */}
          {images.length > 0 && (
            <div id='size-help' className='form-text'>
              Drag and drop to reorder images
            </div>
          )}
          {/* Preview de images */}
          <div>
            <div className='d-flex flex-wrap gap-2'>
              {images.map((image) => (
                <div
                  key={image.id}
                  className='d-flex flex-column gap-1 align-items-center mt-2'
                  style={{ height: '260px', width: '200px' }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('imageId', image.id)
                    setIsDragging(true)
                  }}
                  onDragEnd={() => setIsDragging(false)}
                  onDrop={(e) => handleOnDrop(e, image)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => {
                      setImages(images.filter((img) => img.id !== image.id))
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type='submit' className='btn btn-dark'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewProduct
