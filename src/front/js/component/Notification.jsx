import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'

const Notification = () => {
  const { actions, store } = useContext(Context)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (store.response.type !== '' && store.response.message !== '') {
      setIsVisible(true)

      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [store.response])

  if (!isVisible) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        zIndex: '9999999999999999',
        maxWidth: '600px',
      }}
      className='px-4'
    >
      <div
        className={`alert d-flex gap-3 align-items-center alert-${store.response.type} alert-container fade w-100 alert-dismissible show`}
        role='alert'
      >
        <i
          className={`fa-solid fa-circle-info text-${store.response.type} `}
          style={{ fontSize: '30px' }}
        ></i>
        <p className='m-0'>{store.response.message}</p>
        <button
          type='button'
          className='btn-close justify-self-end'
          data-bs-dismiss='alert'
          aria-label='Close'
        ></button>
      </div>
    </div>
  )
}

export default Notification
