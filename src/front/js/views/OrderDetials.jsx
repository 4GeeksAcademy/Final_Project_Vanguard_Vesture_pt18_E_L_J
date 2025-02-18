import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import { ORDER_STATUS_COLORS } from '../utils/constants'

import Loader from '../component/Loader.jsx'
import CancelOrderModal from '../component/CancelOrderModal.jsx'

const OrderDetials = () => {
  const { orderID } = useParams()
  const { actions, store } = useContext(Context)
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const orderFromStore = store.orders.find(
      (order) => order.id === parseInt(orderID)
    )
    if (orderFromStore) {
      setOrder(orderFromStore)
      setIsLoading(false)
    }

    actions
      .getOrderDetails(orderID)
      .then((o) => setOrder(o))
      .catch(() => navigate('/404'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleUpdateStatus = (status) => {
    if (order.status === status) return actions.showNotification("order already in this status","danger")
    actions.updateOrderStatus(order.id, status).then((order) => setOrder(order))
  }

  if (isLoading || !order) return <Loader />

  return (
    <div className='container py-3'>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          <div className='card border-dark'>
            <div className='card-header border-dark d-flex justify-content-between'>
              <span className='fw-bold'>Order #{order.id}</span>
              <span
                className={`ms-1 badge bg-${ORDER_STATUS_COLORS[order.status]}`}
              >
                {order.status}
              </span>
              <small className='text-muted'>
                {new Date(order.order_date).toLocaleDateString()}
              </small>
            </div>
            <div className='card-body'>
              <p className='card-text'>
                <strong>Order Total:</strong> ${order.total}
              </p>
              <p className='card-text'>
                <strong>Delivery address:</strong> {order.billing_info.address}
              </p>

              {/* Order items */}
              <div className='card-text mb-3'>
                <span className='fw-bold'>Order Items:</span>
                <ul className='list-group mt-2'>
                  {order.order_items.map((item) => {
                    return (
                      <li
                        key={`${item.product.id}-${item.size}`}
                        className='list-group-item d-flex justify-content-between'
                      >
                        <div className='d-flex align-items-center'>
                          <img
                            src={item.product.images[0].image_url}
                            alt={item.product.name}
                            className='img-fluid me-2'
                            style={{ width: '60px' }}
                          />
                          <div className='d-flex flex-column justify-content-between'>
                            <h5 className='align-self-start'>
                              {item.product.name}
                            </h5>
                            <Link to={`/product/${item.product.id}`}>View</Link>
                          </div>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                          <span className='fw-strong'>
                            ${item.product.price}
                          </span>
                          <span className='badge bg-primary rounded-pill'>
                            {item.quantity}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Billing info*/}
              <div className='card-text'>
                <span className='fw-bold'>Billing information:</span>
                <ul className='list-group mt-2'>
                  <li className='list-group-item'>
                    <strong>Full Name:</strong> {order.billing_info.full_name}
                  </li>
                  <li className='list-group-item'>
                    <strong>Phone:</strong> {order.billing_info.phone_number}
                  </li>
                  <li className='list-group-item'>
                    <strong>Email:</strong> {order.billing_info.email}
                  </li>
                </ul>
              </div>
            </div>

            {store.user.is_admin && (
              <div className='card-footer border-dark'>
                <div className='dropdown d-inline-block ms-2'>
                  <button
                    className='btn btn-primary dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton1'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Change status
                  </button>
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton1'
                  >
                    <li>
                      <button
                        className={`dropdown-item text-${
                          ORDER_STATUS_COLORS['in progress']
                        } ${
                          order.status === 'in progress'
                            ? 'active text-white'
                            : ''
                        }`}
                        onClick={() => handleUpdateStatus('in progress')}
                      >
                        In Progress
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item text-${
                          ORDER_STATUS_COLORS['shipping']
                        } ${order.status === 'shipping' ? 'active' : ''}`}
                        onClick={() => handleUpdateStatus('shipping')}
                      >
                        Shipping
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item text-${
                          ORDER_STATUS_COLORS['completed']
                        } ${order.status === 'completed' ? 'active' : ''}`}
                        onClick={() => handleUpdateStatus('completed')}
                      >
                        Completed
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item text-${
                          ORDER_STATUS_COLORS['canceled']
                        } ${order.status === 'canceled' ? 'active' : ''}`}
                        onClick={() => handleUpdateStatus('canceled')}
                      >
                        Canceled
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!store.user.is_admin && order.status === 'in progress' && (
              <div className='card-footer border-dark'>
                <button
                  className='btn btn-danger'
                  data-bs-toggle='modal'
                  data-bs-target='#cancelConfirmation'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* End card */}

          <CancelOrderModal setOrder={setOrder} orderID={order.id} />
        </div>
        {/* End col */}
      </div>
      {/* End row */}
    </div>
  )
}
export default OrderDetials
