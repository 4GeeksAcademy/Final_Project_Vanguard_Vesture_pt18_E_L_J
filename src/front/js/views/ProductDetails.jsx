import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

import Rating from '@mui/material/Rating'
import Loader from '../component/Loader.jsx'
import EditProductForm from '../component/EditProductForm.jsx'
import SizesSelector from '../component/SizesSelector.jsx'

const ProductDetails = () => {
  const { actions, store } = useContext(Context)
  const [product, setProduct] = useState(null)
  const [selectedSizeID, setSelectedSizeID] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [canVote, setCanVote] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    actions.deleteProduct(id).then(() => {
      navigate('/clothes')
      actions.showNotification('Product deleted', 'success')
    })
  }

  const handleRate = (event, newValue) => {
    if (!store.token) {
      actions.showNotification('You must be logged in to rate', 'danger')
      return
    }
    if (!canVote) {
      actions.showNotification('You have to buy a product to rate it', 'danger')
      return
    }

    actions.rateProduct(id, newValue).then((res) => {
      actions.showNotification('Product rated successfully', 'success')
      setProduct(res)
    })
  }

  useEffect(() => {
    if (!store.token) {
      setCanVote(false)
      return
    }
    if (product)
      actions.checkIfUserCanRate(id).then((res) => setCanVote(res.can_rate))
  }, [product, store.token])

  useEffect(() => {
    actions
      .getProductDetails(id)
      .then((data) => setProduct(data))
      .catch((error) => {
        if (error.response.status === 404) navigate('/404')
        else {
          showError(true)
          actions.showNotification('Product not found', 'danger')
        }
      })
  }, [id])

  useEffect(() => {
    if (product) {
      setRating(product.rating)
    }
  }, [product])

  if (!product) return <Loader />

  return (
    <div className='container bg-white p-3 bg-white'>
      <div className='row justify-content-between py-3'>
        <h1 className='col-5 m-0'>{product.name}</h1>
        <div className='col-5 d-flex flex-column align-items-end'>
          <Rating
            name='product-rating'
            value={rating}
            onChange={handleRate}
            precision={0.5}
            readOnly={!canVote}
          />
          <span className='me-1'>
            <strong>{product.rating}</strong> ({product.rating_count})
          </span>
        </div>
      </div>
      {store.user.is_admin && (
        <div className='d-flex gap-2' style={{ marginLeft: '12px' }}>
          <button
            onClick={openModal}
            type='button'
            className='btn btn-outline-secondary'
          >
            <i className='fa-solid fa-pen-to-square'></i>
          </button>

          <button
            onClick={handleDelete}
            type='button'
            className='btn btn-danger'
          >
            <i className='fa-solid fa-trash'></i>
          </button>
        </div>
      )}
      {/* Carousel */}
      <div className='container-fluid mt-2' style={{ maxWidth: '800px' }}>
        <div
          id='carouselExampleFade'
          className='carousel slide carousel-fade carousel-dark border border-secondary'
          data-bs-ride='carousel'
          data-bs-interval='false'
          style={{ height: '400px' }}
        >
          <div className='carousel-indicators'>
            {product.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  type='button'
                  data-bs-target='#carouselExampleFade'
                  data-bs-slide-to={index}
                  className={`${index === 0 ? 'active' : ''}`}
                  aria-current={`${index === 0 ? 'true' : ''}`}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              )
            })}
          </div>
          <div className='carousel-inner h-100'>
            {product.images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className={`carousel-item h-100 ${
                    index === 0 ? 'active' : ''
                  }`}
                >
                  <img
                    src={image.image_url}
                    className='d-block w-100 h-100'
                    style={{ objectFit: 'contain' }}
                    alt='...'
                  />
                </div>
              )
            })}
          </div>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      </div>
      {/* End carousel */}
      <div className='row container-fluid'>
        <div className=' ms-3 col-7'>
          <h3 className='my-3'>Description</h3>
          <p>{product.description}</p>
        </div>
        <div className='col-4'>
          {/* Sizes */}
          <h3 className='ms-5 mt-3'>Sizes</h3>
          <SizesSelector
            sizes={product.sizes_stock}
            setSelectedSizeID={setSelectedSizeID}
            selectedSizeID={selectedSizeID}
          />
          {/* End sizes */}
        </div>
        <div className='col-12 mt-3'>
          {/* Quantity */}
          <h3 className='mt-3'>Quantity</h3>
          <div className='d-flex align-items-center gap-2'>
            <button
              onClick={() =>
                setQuantity((prev) => (prev === 1 ? prev : prev - 1))
              }
              className='btn btn-black'
            >
              <i className='fa-solid fa-minus' style={{ color: '#000000' }}></i>
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
                if (!selectedSizeID) {
                  actions.showNotification('Please select a size', 'danger')
                  return
                }
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
        </div>
      </div>

      <div className=' d-flex align-items-end flex-column'>
        {/* Price */}
        <h3 className='my-3'>${product.price.toLocaleString('en-US')}</h3>

        {/* Buttons */}
        <div className='d-flex flex-wrap gap-2'>
          {!store.user.is_admin && store.token && (
            <>
              <button
                type='button'
                className='btn btn-outline-dark'
                onClick={() => {
                  selectedSizeID == null
                    ? actions.showNotification('Error, select a size', 'danger')
                    : actions
                        .postShoppingCart(product.id, quantity, selectedSizeID)
                        .then((res) =>
                          actions.showNotification(
                            'Successfuly added to cart',
                            'success'
                          )
                        )
                }}
              >
                Add to cart
              </button>
              <button
                type='button'
                className='btn btn-outline-dark'
                onClick={() => {
                  navigate('/checkout/' + product.id)
                }}
              >
                Buy now
              </button>
              <button
                onClick={() =>
                  actions
                    .postFavorites(product.id)
                    .then((res) =>
                      actions.showNotification('Favorited added', 'success')
                    )
                }
                className={`btn bg-black ${
                  store.favorites.some((favorite) => favorite.id === product.id)
                    ? 'text-danger'
                    : 'text-white'
                }`}
              >
                <strong>♥</strong>
              </button>
            </>
          )}
        </div>
        <EditProductForm
          setProduct={setProduct}
          product_id={product.id}
          isOpen={isOpen}
          onClose={closeModal}
          product={product}
        />
      </div>
    </div>
  )
}

export default ProductDetails
