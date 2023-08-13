import React from 'react'

import styles from './styles/SizesSelector.module.css'

const SizesSelector = ({ sizes, selectedSizeID,setSelectedSizeID }) => {
  return (
    <div className='d-flex flex-wrap gap-3'>
      {sizes.map((size, index) => {
        return (
          <div
            key={size.id}
            className={`border border-secondary rounded-2 d-flex flex-column align-items-center p-2 p-md-3 ${
              styles.hover
            } ${selectedSizeID === size.id && styles.selected}`}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedSizeID(size.id)
            }}
          >
            <span className='text-center fs-3 fw-bold'>{size.size}</span>
            <span className='text-center'>
              <strong>{size.stock}</strong> in stock
            </span>
          </div>
        )
      })}
    </div>
  )
}
export default SizesSelector
