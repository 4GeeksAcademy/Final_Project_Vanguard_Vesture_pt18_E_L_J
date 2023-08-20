import React, { useContext, useEffect, useState } from 'react'
import CartProduct from '../component/CartProduct.jsx'
import PaymentComponent from '../component/PaymentComponent.jsx'
import { Navigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

const Cart = () => {
  const { actions, store } = useContext(Context)
  const user = store.user
  if (store.user.is_admin) return <Navigate to='/' />
  const [useProfileInfo, setUseProfileInfo] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (useProfileInfo) {
      setFullName(user.first_name + ' ' + user.last_name)
      setEmail(user.email)
      setPhoneNumber(user.phone)
      setAddress(user.address)
    } else {
      setFullName('')
      setEmail('')
      setPhoneNumber('')
      setAddress('')
    }
  }, [useProfileInfo])

  const clearCart = async () => {
    const shoppingCart = store.shopping_cart

    for (const item of shoppingCart) {
      await actions
      .deleteShoppingCart(item.product.id, item.size.id)
      .then((res)=>actions.showNotification("Shopping cart deleted","success"))
    }
  }

  return (
    <div className="bg-black text-white container-fluid pt-2 pb-5" style={{ minHeight: '100vh' }}>
      <h1 className=' d-flex justify-content-center align-items-center'>
        Your Shopping Cart
      </h1>   
      {store.shopping_cart.length > 0 ? (
        <>
          {store.shopping_cart.map((cartItem) => (
            <div className='d-flex text-center w-100' key={cartItem.product.id}>
              <CartProduct index={cartItem.product.id} cartItem={cartItem} />
            </div>
          ))}
          {/* Billing form */}
          <div className='row mt-3 g-3'>
            <h3 className='col-12'>Billing Info</h3>
            <div className='col-12'>
              <input
                className='form-check-input'
                type='checkbox'
                id='use-my-profile'
                checked={useProfileInfo}
                onChange={(e) => setUseProfileInfo(e.target.checked)}
              />
              <label className='form-check-label ms-2' htmlFor='use-my-profile'>
                Use my profile info
              </label>
            </div>

            <div className='col-12 col-sm-6'>
              <label htmlFor='name' className='form-label'>
                Full name
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                placeholder='John Doe'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className='col-12 col-sm-6'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@example.com'
              />
            </div>
            <div className='col-12'>
              <label htmlFor='address' className='form-label'>
                Delivery Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                placeholder='1234 Main St'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='col-12 col-sm-6 col-lg-4'>
              <label htmlFor='phone' className='form-label'>
                Phone number
              </label>
              <input
                type='text'
                className='form-control'
                id='phone'
                placeholder='(123) 456-7890'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          {/* End billing form */}
          <h1 className='text-center mt-3'>Total Pay: ${actions.getTotalCart()}</h1>
          <div className='d-flex justify-content-center'>
            <PaymentComponent
              fromCart
              cartItems={store.shopping_cart}
              billingInfo={{
                fullName: 'John Doe',
                email: 'demo@mail.com',
                address: '1234 Main St',
                phoneNumber: '1234567890',
              }}
              isBillingInfoValid={Boolean(
                fullName && email && phoneNumber && address
              )}
            />
            <button
              onClick={() => clearCart()}
              style={{ maxHeight: '40px' }}
              className="btn btn-danger m-3 rounded-pill"
            >
              CANCEL ORDER
            </button>
          </div>
        </>
        ) : (
          <div className="bg-black text-white container-fluid pt-2" style={{ minHeight: '100vh' }}>
            <h2 className='text-center'>You haven't items in your cart</h2>
          </div>
      )}
    </div>
  )
}

export default Cart
