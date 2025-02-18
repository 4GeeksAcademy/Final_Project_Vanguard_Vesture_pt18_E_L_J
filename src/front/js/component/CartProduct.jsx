import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const CartProduct = ({ cartItem }) => {
  const { actions, store } = useContext(Context)

  const [quantity, setQuantity] = useState(cartItem.quantity)

  useEffect(() => {
    actions.updateCartItemQuantity(
      cartItem.product.id,
      cartItem.size.id,
      quantity
    )
  }, [quantity])

  const navigate = useNavigate()

  const handleDetails = () => {
    navigate(`/product/${cartItem.product.id}`)
  }

 

  return (
    <div className='text-center mt-1 mx-auto d-flex flex-wrap gap-2 justify-content-center text-black '>
      <div style={{ width: '100%', height: "100%" , maxWidth:"450px" }} className='card shadow-lg'>
        <div className='card-body  d-flex justify-content-center row'>
          <h5  className='card-title'> {cartItem.product.name}</h5>
          <div
            style={{ width: '200px', height: "200px" }}
            className='ms-3 rounded-circle   overflow-hidden d-flex justify-content-center  col'
          >
            <img
              style={{
                objectFit: 'cover',
              }}
              className=' img-cover d-flex justify-content-center text-center rounded-circle'
              src={cartItem.product.images[0]?.image_url}
              alt=''
            />
          </div>
          <div className='col  align-center'>
            <p className='card-text'>
              <span>Size: {cartItem.size.name}</span>{' '}
            </p>

            <p className='card-text'>
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? prev : prev - 1))
                }
                className='btn btn-black'
              >
                <i
                  className='fa-solid fa-minus'
                  style={{ color: '#000000' }}
                ></i>
              </button>

              <input
                type='text'
                value={quantity}
                onChange={(e) =>
                  e.target.value > 0 && setQuantity(Number(e.target.value))
                }
                className='border-0 text-center mx-1'
                style={{ width: '30px' }}
              />
              <button
                onClick={() => {
                  const cartSizeId = cartItem.size.id
                  const sizeStock = cartItem.product.sizes_stock.find(s => s.id === cartSizeId).stock
                  if (quantity === sizeStock) return
                  setQuantity((prev) => prev + 1)
                }}
                className='btn btn-black'
              >
                <i
                  className='fa-solid fa-plus'
                  style={{ color: '#000000' }}
                ></i>
              </button>
            </p>

            <p className='card-text'>
              <span>Price: U$S</span> {cartItem.product.price}
            </p>
            <p className='card-text'>
              <span>Total: U$S</span> {cartItem.product.price * quantity}
            </p>
          </div>

          <div className=' d-flex justify-content-center align-items-center'>
            <button
              onClick={() => handleDetails()}
              className='btn btn-black m-3'
            >
              <i className='fa-solid fa-eye' style={{ color: '#000000' }}></i>
            </button>

            <button
              href='#'
              onClick={() =>
                actions
                  .deleteShoppingCart(
                    cartItem.product.id,
                    cartItem.size.id
                  )
                  .then((res) => actions.showNotification("Cart product deleted", "success"))
              }
              className='btn btn-black m-3 '
            >
              <strong>
                <i className='fa-solid fa-xmark' style={{ color: 'black' }}></i>
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
