import React, { useContext, useState, useEffect, useMemo } from 'react'
import { Context } from '../store/appContext.js'

import Loader from '../component/Loader.jsx'
import OrderCard from '../component/OrderCard.jsx'

const UserOrders = () => {
  const { actions, store } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  const sortedOrders = useMemo(
    () =>
      store.orders.sort((a, b) => {
        if (a.status === b.status)
          return new Date(b.order_date) - new Date(a.order_date)
        else if (a.status === 'in progress') return -1
        else if (a.status === 'shipping' && b.status === 'completed') return -1
        else if (a.status === 'shipping' && b.status === 'canceled') return -1
        else if (a.status === 'completed' && b.status === 'canceled') return -1
        else return 1
      }),
    [store.orders]
  )

  useEffect(() => {
    actions
    .getOrdersUser().finally(() => setIsLoading(false))
    .then((res)=>actions.showNotification("Orders Loaded","success")
    )
  }, [])

  return (
    <div className='container py-4'>
      <h1 className='text-center mb-4'>Your Orders</h1>
      {isLoading && store.orders.length < 1 && <Loader />}
      <div className='vstack gap-1 pt-2'>
        {sortedOrders.map((order, index) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
export default UserOrders
