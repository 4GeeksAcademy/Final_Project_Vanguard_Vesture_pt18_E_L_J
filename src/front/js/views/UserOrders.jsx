import React, { useContext, useState, useEffect } from 'react'

import { Context } from '../store/appContext.js'
import { ORDER_STATUS_COLORS } from '../utils/constants.js'

import { Link } from 'react-router-dom'
import Loader from '../component/Loader.jsx'

const UserOrders = () => {
  const { actions, store } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    actions.getUserOrders().finally(() => setIsLoading(false))
  }, [])

  return (
    // Display user orders in
    <div className='container py-3'>
      <h1 className='text-center mb-3'>Your Orders</h1>
      {isLoading && store.orders.length < 1 && <Loader />}
      <div className='row g-2'>
        <div className='col-12'>
          {store.orders.map((order) => {
            return (
              <div key={order.id} className='card mb-2'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    Order #{order.id}
                    <span
                      className={`ms-3 badge bg-${
                        ORDER_STATUS_COLORS[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </h5>
                  <h6 className='card-subtitle mb-2 text-muted small'>
                    {new Date(order.order_date).toLocaleDateString()}
                  </h6>
                  <p className='card-text'>
                    <strong>Total:</strong> ${order.total}
                    <small className='text-muted ms-3'>
                      {order.order_items.length} items
                    </small>
                  </p>
                  <Link to={`/order/${order.id}`} className='card-link'>
                    View
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default UserOrders
