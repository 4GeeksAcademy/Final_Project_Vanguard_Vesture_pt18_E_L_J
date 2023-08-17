import React, { useContext } from 'react'

import { Context } from '../store/appContext.js'
import { Navigate } from 'react-router-dom'

import OrderAccordionItem from '../component/OrderAccordionItem.jsx'

const AdminOrders = () => {
  const { store } = useContext(Context)

  if (!store.user.is_admin) return <Navigate to='/' />

  return (
    <div className='container py-4'>
      <div className='accordion' id='ordersAccordion'>
        <OrderAccordionItem status='in progress' first />
        <OrderAccordionItem status='shipping' />
        <OrderAccordionItem status='completed' />
        <OrderAccordionItem status='canceled' />
      </div>
    </div>
  )
}
export default AdminOrders
