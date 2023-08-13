import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import ProductCard from '../component/ProductCard.jsx'
import Loader from '../component/Loader.jsx'
import { CATEGORIES } from '../utils/contants.js'

const ProductList = ({ category }) => {
  const { actions, store } = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedSizesID, setSelectedSizesID] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const filterByName = (product, search) =>
    product.name.toLowerCase().includes(search.toLowerCase())

  const filterByType = (product, selectedTypes) =>
    selectedTypes.length === 0 || selectedTypes.includes(product.type)

  const filterByPrice = (product, minPrice, maxPrice) =>
    (minPrice === 0 || product.price >= minPrice) &&
    (maxPrice === 0 || product.price <= maxPrice)

  const filterBySize = (product, selectedSizes) =>
    selectedSizes.length === 0 ||
    selectedSizes.some((size) =>
      product.sizes_stock.some((s) => s.size === size)
    )

  const filteredProducts = useMemo(
    () =>
      store[category].filter(
        (product) =>
          filterByName(product, search) &&
          filterByType(product, selectedTypes) &&
          filterByPrice(product, minPrice, maxPrice) &&
          filterBySize(product, selectedSizesID)
      ),
    [store[category], search, selectedTypes, minPrice, maxPrice]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setMinPrice(e.target[0].value || 0)
    setMaxPrice(e.target[1].value || 0)
  }

  useEffect(() => {
    actions.getProducts(category).finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    actions.getSizes()
  }, [])

  return (
      <div className='container'>
        <h1 className='text-capitalize'>{category}</h1>

        <div className='d-flex gap-2 flex-wrap'>
          {/* Type filter */}
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle bg-black text-white'
              type='button'
              id='typeFilter'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Filter by type
            </button>
            <ul className='dropdown-menu' aria-labelledby='typeFilter'>
              {store[`${category}_types`].map((type) => (
                <li className='dropdown-item d-flex gap-2' key={type}>
                  <input
                    className=' form-check-input'
                    type='checkbox'
                    value={type}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedTypes([...selectedTypes, type])
                      else
                        setSelectedTypes(
                          selectedTypes.filter(
                            (selectedType) => selectedType !== type
                          )
                        )
                    }}
                    id={type}
                  />
                  <label
                    className='form-check-label text-capitalize'
                    htmlFor={type}
                  >
                    {type}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Size filter */}
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle bg-black text-white'
              type='button'
              id='sizeFilter'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Filter by size
            </button>
            <ul className='dropdown-menu' aria-labelledby='sizeFilter'>
              {store.sizes[category].map((size) => (
                <li className='dropdown-item d-flex gap-2' key={size.id}>
                  <input
                    className=' form-check-input'
                    type='checkbox'
                    value={size.name}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedSizesID([...selectedSizesID, size.id])
                      else
                        setSelectedSizesID(
                          selectedTypes.filter(
                            (selectedSizeID) => selectedSizeID !== size.id
                          )
                        )
                    }}
                    id={size.name}
                  />
                  <label
                    className='form-check-label text-capitalize'
                    htmlFor={size.name}
                  >
                    {size.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <form
            className='d-flex gap-1 align-items-center'
            onSubmit={handleSubmit}
          >
            <div className='input-group' style={{ width: '100px' }}>
              <input
                type='number'
                className='form-control'
                placeholder='Min price'
                aria-label='Min price'
                aria-describedby='button-addon2'
              />
            </div>
            <i className='fa-solid fa-minus'></i>
            <div className='input-group' style={{ width: '100px' }}>
              <input
                type='number'
                className='form-control'
                placeholder='Max price'
                aria-label='Max price'
                aria-describedby='button-addon2'
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              $
            </button>
          </form>
          {/* End price filter */}
        </div>

        <div className='input-group my-3'>
          <input
            type='text'
            className='form-control'
            placeholder="Search a product by it's name"
            aria-label="Search a product by it's name"
            aria-describedby='button-addon2'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading && <Loader />}

        <div className='d-flex flex-wrap gap-2 justify-content-center'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  )
}

export default ProductList
