import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const ProductCard = ({ product }) => {
  const { actions, store } = useContext(Context)

  const navigate = useNavigate()

  return (
    <div className='text-center'>
      <div
        className='card m-2'
        style={{ width: '18rem', height: '500px', borderRadius: '20px' }}
      >
        <img
          src={product.images.length > 0 ? product.images[0].image_url : ''}
          className=''
          style={{
            height: '18rem',
            objectFit: 'cover',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottom: '1px solid rgba(0,0,0,.125)'
          }}
          alt={product.name}
        />
        <div className='card-body'>
          <h5 className='card-title'> {product.name}</h5>

          <div>
            <p className='card-text'>
              <span>Color:</span>
              {product.color}
            </p>
            <p className='card-text'>
              <span>Price:</span> ${product.price}
            </p>
          </div>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className='btn bg-black text-white m-3'
          >
            Details
          </button>

          <button
            onClick={() => actions.postFavorites(product.id)}
            className={`btn bg-black m-3 ${
              store.favorites.some((favorite) => favorite.id === product.id)
                ? 'text-danger'
                : 'text-white'
            }`}
          >
            <strong>♥</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
