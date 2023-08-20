import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext.js'

const NewSize = ({ selectedCategory }) => {
  const [newSizeName, setNewSizeName] = useState('')
  const { actions } = useContext(Context)

  const handleCreateSize = () => {
    if (!newSizeName) {
      actions.showNotification('Please enter a size name', 'danger')
      return
    }

    actions
      .createSize(newSizeName, selectedCategory)
      .then((res) => setNewSizeName(''))
  }

  return (
    <>
      <div className='d-flex gap-2 align-items-center'>
        <input
          type='text'
          id='newSize'
          style={{
            width: '70px',
          }}
          value={newSizeName}
          onChange={(e) => setNewSizeName(e.target.value)}
        />
        <button
          type='button'
          className='btn btn-dark'
          onClick={handleCreateSize}
        >
          Add
        </button>
      </div>
      <div id='size-help' className='form-text'>
        The size will be added to the selected category
      </div>
    </>
  )
}
export default NewSize
