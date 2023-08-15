import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const CancelOrderModal = ({ setOrder, orderID }) => {
  const { actions } = useContext(Context)

  return (
    <div
      className='modal fade'
      id='cancelConfirmation'
      aria-hidden='true'
      aria-labelledby='cancelConfirmation'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-body'>
            <div className='alert alert-danger' role='alert'>
              Are you sure you want to cancel this order?
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-danger'
              data-bs-dismiss='modal'
              onClick={() => {
                actions
                  .cancelOrder(orderID)
                  .then((newOrder) => setOrder(newOrder))
              }}
            >
              Yes, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelOrderModal
