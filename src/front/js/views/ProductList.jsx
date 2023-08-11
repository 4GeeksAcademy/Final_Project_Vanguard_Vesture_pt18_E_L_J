import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import ProductCard from '../component/ProductCard.jsx'
import Loader from '../component/Loader.jsx'

const ProductList = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { actions, store } = useContext(Context)
  useEffect(() => {
    actions.getProducts(category).finally(() => setIsLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='position-relative container'>
        <h1 className='text-capitalize'>{category}</h1>
        {isLoading && <Loader />}
        {store[category].map((product) => (
          <div
            key={product.id}
            style={{
              width: '90%',
              margin: 'auto',
            }}
            className='d-flex'
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
