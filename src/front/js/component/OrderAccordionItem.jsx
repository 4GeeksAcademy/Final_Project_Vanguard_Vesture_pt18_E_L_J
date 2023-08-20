import React, { useContext, useState, useEffect, useMemo } from 'react'
import { Context } from '../store/appContext.js'

import OrderCard from '../component/OrderCard.jsx'
import Loader from '../component/Loader.jsx'
import { ORDER_STATUS_COLORS } from '../utils/constants.js'

const OrderAccordionItem = ({ status, first }) => {
  const { store, actions } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)
  const [filterID, setFilterID] = useState('')
  const [filterEmail, setFilterEmail] = useState('')

  useEffect(() => {
    if (first) {
      actions
        .getAllOrdersByStatus('in progress')
        .then((res) => actions.showNotification("Orders status loaded", "success"))
        .finally(() => setIsLoading(false))
    }
  }, [])

  const filterByID = (order) => {
    if (filterID.length === 0) return true
    return order.id.toString().includes(filterID)
  }
  const filterByEmail = (order) => {
    if (filterEmail.length === 0) return true
    return (
      order.user.email.toLowerCase().includes(filterEmail.toLowerCase()) ||
      order.billing_info.email.toLowerCase().includes(filterEmail.toLowerCase())
    )
  }

  const filteredOrders = useMemo(() => {
    return store.admin_orders[status].filter(
      (order) => filterByID(order) && filterByEmail(order)
    )
  }, [filterID, filterEmail, store.admin_orders[status]])

  const collapseID = status.replace(' ', '') + 'Collapse'
  const headerID = status.replace(' ', '') + 'Heading'

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={headerID}>
        <button
          className={`accordion-button text-${ORDER_STATUS_COLORS[status]
            } fw-bold fs-5 text-capitalize ${!first && 'collapsed'}`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={'#' + collapseID}
          aria-expanded={first ? 'true' : 'false'}
          aria-controls={collapseID}
          onClick={() => {
            actions
              .getAllOrdersByStatus(status)
              .finally(() => setIsLoading(false))
          }}
        >
          {status}
        </button>
      </h2>
      <div
        id={collapseID}
        className={`accordion-collapse ${first ? 'collapse show' : 'collapse'}`}
        aria-labelledby={headerID}
        data-bs-parent='#ordersAccordion'
      >
        <div className='accordion-body'>
          {isLoading && <Loader />}
          {!isLoading && store.admin_orders[status].length === 0 && (
            <h6 className='text-center'>No orders in progress</h6>
          )}

          {/* Show input to filter by id */}
          {store.admin_orders[status].length > 0 && (
            <div className='input-group mb-3'>
              <label className='input-group-text'>Order ID</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setFilterID(e.target.value)
                }}
              />
            </div>
          )}
          {/* Show input to filter by email */}
          {store.admin_orders[status].length > 0 && (
            <div className='input-group mb-3'>
              <label className='input-group-text'>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>
          )}
          {filterID.length > 0 && filteredOrders.length === 0 && (
            <h5 className='text-center'>No orders found</h5>
          )}
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} admin />
          ))}
        </div>
      </div>
    </div>
  )
}
export default OrderAccordionItem
