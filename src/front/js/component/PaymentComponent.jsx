import React, { useContext } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Context } from '../store/appContext.js'

const PaymentComponent = () => {
  const { store, actions } = useContext(Context)

  const stylePay = {
    layout: 'vertical',
    color: 'black',
    label: 'buynow',
    shape: 'pill',
  }

  const createOrder = async () => {
    const backendUrl =
      process.env.BACKEND_URL + `api/create-paypal-order/`
    return await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: store.shopping_cart,
        amount: actions.getTotalCart(),
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
  }
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    const backendUrl =
      process.env.BACKEND_URL + `api/capture-paypal-order`
    return await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Successfully payment:', responseData)
      })
      .catch((error) => {
        console.error('Error capturing payment:', error)
      })
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={stylePay}
      disabled={undefined}
      forceReRender={[stylePay]}
      fundingSource={undefined}
    />
  )
}

export default PaymentComponent
