import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Context } from '../store/appContext.js'

import Loader from '../component/Loader.jsx'
import SizesSelector from '../component/SizesSelector.jsx'

const CheckoutProduct = () => {
  const { actions, store } = useContext(Context)
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedSizeID, setSelectedSizeID] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    actions
      .getProductDetails(params.productID)
      .then((res) => setProduct(res))
      .finally(() => setIsLoading(false))
  }, [])
  return (
    <div className='container'>
      <h1 className='my-3'>Checkout</h1>
      {isLoading && <Loader />}
      {product && (
        <div className='d-flex flex-column gap-3'>
          <img
            src={product.images[0].image_url}
            alt={product.name}
            className='img-fluid'
          />

          <h2 className='text-center'>{product.name}</h2>

          <hr className='m-0' />

          {/* Sizes */}
          <h3>Sizes</h3>
          <div className='d-flex flex-wrap gap-3'>
            <SizesSelector
              sizes={product.sizes_stock}
              setSelectedSizeID={setSelectedSizeID}
              selectedSizeID={selectedSizeID}
            />
          </div>
          {/* End sizes */}

          {/* Quantity */}
          {selectedSizeID && (
            <>
              <h3>Quantity</h3>
              <div className='d-flex align-items-center gap-2'>
                <button
                  onClick={() => {
                    if (!selectedSizeID) return
                    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
                  }}
                  className='btn btn-black'
                >
                  <i
                    className='fa-solid fa-minus'
                    style={{ color: '#000000' }}
                  ></i>
                </button>

                <input
                  type='number'
                  value={quantity}
                  onChange={(e) =>
                    e.target.value > 0 && setQuantity(e.target.value)
                  }
                  className='border-0 text-center'
                  style={{ width: '50px' }}
                />
                <button
                  onClick={() => {
                    if (!selectedSizeID) return
                    const sizeStock = product.sizes_stock.find(
                      (s) => s.id === selectedSizeID
                    ).stock
                    if (quantity >= sizeStock) return
                    setQuantity((prev) => prev + 1)
                  }}
                  className='btn btn-black'
                >
                  <i
                    className='fa-solid fa-plus'
                    style={{ color: '#000000' }}
                  ></i>
                </button>
              </div>
            </>
          )}
          {/* End quantity */}

          {/* Price */}
          <h3>
            Total:{' '}
            <span className='badge bg-secondary'>
              ${product.price.toLocaleString('en-US')}
            </span>
          </h3>
        </div>
      )}
    </div>
  )
}
export default CheckoutProduct
