import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Context } from '../store/appContext.js'

import Loader from '../component/Loader.jsx'
import SizesSelector from '../component/SizesSelector.jsx'
import PaymentComponent from '../component/PaymentComponent.jsx'

const CheckoutProduct = () => {
  const { actions, store } = useContext(Context)
  const user = store.user
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedSizeID, setSelectedSizeID] = useState(null)
  const [product, setProduct] = useState(null)

  const [useProfileInfo, setUseProfileInfo] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')


  useEffect(() => {
    actions.getProductDetails(params.productID).then((res) => setProduct(res))
  }, [])

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

  if (!product) return <Loader />

  return (
    <div className='container py-4'>
      <h1 className='mb-3'>Buy now!</h1>
      <div className='d-flex gap-3 align-items-center mb-3'>
        <h2 className='m-0'>{product.name}</h2>
        <span className='badge bg-secondary ms-1 fs-5'>
          ${product.price.toLocaleString('en-US')} c/u
        </span>
      </div>

      <div className='d-flex flex-column gap-3'>
        <div className='d-flex gap-2' style={{ height: '180px' }}>
          <img
            src={product.images[0]?.image_url}
            alt={product.name}
            className='img-fluid border border-secondary'
            style={{
              maxWidth: '180px',
              alignSelf: 'center',
              objectFit: 'contain',
              borderRadius: '5px',
            }}
          />

          <div className='d-flex gap-1 flex-column overflow-auto'>
            <SizesSelector
              sizes={product.sizes_stock}
              setSelectedSizeID={setSelectedSizeID}
              selectedSizeID={selectedSizeID}
            />
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <h5 className='m-0 me-4'>
            Total:
            <span
              className='badge bg-info ms-1 fs-6'
              style={{ minWidth: '80px' }}
            >
              ${(product.price * quantity).toLocaleString('en-US')}
            </span>
          </h5>

          <button
            onClick={() => {
              if (!selectedSizeID) return
              setQuantity((prev) => (prev === 1 ? prev : prev - 1))
            }}
            className='btn btn-black'
          >
            <i className='fa-solid fa-minus' style={{ color: '#000000' }}></i>
          </button>

          <input
            type='number'
            value={quantity}
            onChange={(e) => {
              if (!selectedSizeID) return
              if (e.target.value < 1) return
              const sizeStock = product.sizes_stock.find(
                (s) => s.id === selectedSizeID
              ).stock
              if (e.target.value > sizeStock) return
              setQuantity(e.target.value)
            }}
            className='border-0 text-center border border-secondary'
            style={{
              width: '50px',
              backgroundColor: '#f1f1f1',
              borderRadius: '5px',
              zIndex: '-99',
            }}
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
            <i className='fa-solid fa-plus' style={{ color: '#000000' }}></i>
          </button>
        </div>

        <hr />

        {/* Billing Form */}
        <div className='row g-3'>
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
        <PaymentComponent
          cartItems={[
            {
              size: { id: selectedSizeID },
              product,
              quantity,
            },
          ]}
          billingInfo={{ fullName, email, phoneNumber, address }}
          isBillingInfoValid={Boolean(
            fullName && email && phoneNumber && address && selectedSizeID
          )}
        />
      </div>
    </div>
  )
}
export default CheckoutProduct
