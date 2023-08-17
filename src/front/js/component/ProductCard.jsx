import React, { useContext , useState } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const ProductCard = ({ product }) => {
  const { actions, store } = useContext(Context)

  const navigate = useNavigate()

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const scaleStyle = {
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s',
  };

  return (
    <div onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={scaleStyle} className='text-center'>
      <div
        className='card m-2 shadow-lg text-white bg-black'
        style={{ width: '300px', height: '450px', borderRadius: '20px' }}
      >
        <img
        onClick={() => navigate(`/product/${product.id}`)}
          src={product.images.length > 0 ? product.images[0].image_url : ''}
          className=''
          style={{
            height: '14rem',
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
            className='btn btn-light p-1 m-3'
            // style={{maxWidth:"30px"}}
          >
            Details
          </button>

          <button
            onClick={() => actions.postFavorites(product.id)}
            className={`btn bg-white m-3 ${
              store.favorites.some((favorite) => favorite.id === product.id)
                ? 'text-danger'
                : 'text-black'
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
