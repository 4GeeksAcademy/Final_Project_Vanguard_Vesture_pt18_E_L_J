import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { CATEGORIES } from '../utils/constants.js'

import NewSize from './NewSize.jsx'

const EditProductForm = ({
  isOpen,
  onClose,
  product_id,
  setProduct,
  product,
}) => {
  const { store, actions } = useContext(Context)
  const [selectedCategory, setSelectedCategory] = useState(product.category_id)

  const [sizes, setSizes] = useState([])

  useEffect(() => {
    const sizesWithStock = store.sizes[CATEGORIES[product.category_id]].map(
      (size) => {
        const sizeStock = product.sizes_stock.find(
          (s) => s.id === size.id
        )?.stock

        return { ...size, stock: sizeStock || 0 }
      }
    )
    setSizes(sizesWithStock)
  }, [selectedCategory, store.sizes])

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
      sizes_stock: sizes.filter((s) => Boolean(s.stock)),
    }
    actions
      .editProduct(product_id, product)
      .then((res) => {
        setProduct(res)
        onClose()
      })
      .then((res) =>
        actions
          .showNotification('Success product update', 'success')
          .catch((err) =>
            actions.showNotification('Error, product not updated', 'danger')
          )
      )
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(Number(event.target.value))
  }

  const handleSizeStockChange = (event) => {
    const sizeId = Number(event.target.id)
    const stock = Number(event.target.value)
    const newSizes = sizes.map((size) => {
      if (size.id === sizeId) return { ...size, stock }
      return size
    })
    setSizes(newSizes)
  }

  return (
    <div
      className={`modal ${isOpen ? 'show' : ''}`}
      tabIndex='-1'
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className='modal-dialog text-white bg-black  border rounded-3'>
        <div className='modal-content'>
          <div className='modal-title p-3 h4  bg-black '>Edit Product</div>
          <div className='modal-body bg-black'>
            <form onSubmit={handleSubmit}>
              <div className='row mb-3 g-3'>
                {/* Name */}
                <div className='col-12 col-lg-6'>
                  <label htmlFor='name' className='form-label h4'>
                    Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    defaultValue={product.name}
                    required
                  />
                </div>

                {/* Price */}
                <div className='col-6 col-lg-4'>
                  <label htmlFor='price' className='form-label h4'>
                    Price
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='price'
                    step='any'
                    required
                    defaultValue={product.price}
                  />
                </div>

                {/* Color */}
                <div className='col-6 col-lg-3'>
                  <label htmlFor='color' className='form-label h4'>
                    Color
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='color'
                    required
                    defaultValue={product.color}
                  />
                </div>

                {/* Type */}
                <div className='col-6 col-lg-3'>
                  <label htmlFor='type' className='form-label h4'>
                    Type
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='type'
                    required
                    defaultValue={product.type}
                  />
                </div>

                {/* Categories */}
                <div className='col-6 col-lg-6 ps-lg-5'>
                  <h4>Category</h4>
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

                {/* Description */}
                <div className='col-12'>
                  <label htmlFor='description' className='form-label h4'>
                    Description
                  </label>
                  <textarea
                    className='form-control'
                    id='description'
                    rows='3'
                    required
                    defaultValue={product.description}
                  ></textarea>
                </div>

                {/* Stock */}
                <div className='col-12 col-lg-8'>
                  <h4>Stock</h4>
                  <div className='d-flex flex-wrap gap-4'>
                    {sizes.map((size) => {
                      return (
                        <div
                          className='d-flex flex-column align-items-center'
                          key={size.id}
                        >
                          <label htmlFor={size.id} className='fs-4 fw-bold'>
                            {size.name}
                          </label>
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
                      )
                    })}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-6 '>
                    <h4>Add new size</h4>
                    <NewSize
                      setSizes={setSizes}
                      selectedCategory={selectedCategory}
                    />
                  </div>

                  <div className='col-6 '>
                    <button type='submit' className='ms-3 mt-2 btn btn-dark'>
                      Submit
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger mt-2 add ms-3'
                      data-bs-dismiss='modal'
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProductForm
