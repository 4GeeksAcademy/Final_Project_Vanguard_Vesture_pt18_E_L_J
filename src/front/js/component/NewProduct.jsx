import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

const CATEGORIES = {
  1: 'clothes',
  2: 'choes',
  3: 'accessories',
}

const NewProduct = () => {
  const { actions, store } = useContext(Context)
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [sizes, setSizes] = useState(null)
  const [newSizeName, setNewSizeName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    actions.getSizes().then((res) => setSizes(res))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Sizes that have stock > 0
    const product = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      color: event.target.color.value,
      type: event.target.type.value,
      category_id: selectedCategory,
      sizes_stock: sizes[CATEGORIES[selectedCategory]].filter((s) => Boolean(s.stock)),
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

        <button type='submit' className='btn btn-dark'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewProduct
