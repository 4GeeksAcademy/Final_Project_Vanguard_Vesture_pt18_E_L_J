import React from 'react'
import { ORDER_STATUS_COLORS } from '../utils/constants.js'
import { Link } from 'react-router-dom'

const OrderCard = ({ order, admin }) => {
  return (
    <div className='card mb-2'>
      <div className='card-header d-flex gap-3 align-items-center'>
        <span className='h5 m-0'>Order #{order.id}</span>
        <span
          className={`badge bg-${ORDER_STATUS_COLORS[order.status]}`}
          style={{ fontSize: '14px' }}
        >
          {order.status}
        </span>
      </div>
      <div className='card-body d-flex flex-column flex-md-row gap-3' style={{ maxWidth: '700px' }}>
        <div className='d-flex gap-4'>
        <div className='d-flex flex-column gap-2'>
          <span className='fw-bold' style={{ fontSize: '14px' }}>
            {new Date(order.order_date).toLocaleDateString()}
          </span>
          <span>
            <strong>Total:</strong> ${order.total}
          </span>
          <span className='small'>{order.order_items.length} items</span>
        </div>

        <div className='hstack gap-2 overflow-auto'>
          {order.order_items.map((item) => (
            <Link
              key={item.product.images[0].image_url}
              to={`/product/${item.product.id}`}
            >
              <img
                src={item.product.images[0].image_url}
                alt={item.product.name}
                className='rounded'
                style={{ width: '50px', height: '50px' }}
              />
            </Link>
          ))}
        </div>
        </div>

        {admin && <div className='d-flex flex-column gap-2 ms-md-auto'>
          <div>
            <strong>User email:</strong> {order.user.email}
          </div>
          <div>
            <strong>Full name:</strong> {order.billing_info.full_name}
          </div>
          <div>
            <strong>Address:</strong> {order.billing_info.address}
          </div>
          <div>
            <strong>Phone:</strong> {order.billing_info.phone_number}
          </div>

        </div>}
      </div>
      <div className='card-footer'>
        <Link to={`/order/${order.id}`} className='card-link'>
          View
        </Link>
        {}
      </div>
    </div>
  )
}
export default OrderCard
