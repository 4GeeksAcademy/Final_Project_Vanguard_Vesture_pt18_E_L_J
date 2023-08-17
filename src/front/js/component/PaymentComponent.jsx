import React, { useContext } from 'react'
import { Context } from '../store/appContext.js'
import { useNavigate } from 'react-router-dom'

import { PayPalButtons } from '@paypal/react-paypal-js'

const PaymentComponent = ({ cartItems, billingInfo, isBillingInfoValid, fromCart = false }) => {
  const { actions, store } = useContext(Context)
  const stylePay = {
    layout: 'vertical',
    color: 'black',
    label: 'buynow',
    shape: 'pill',
  }

  const navigate = useNavigate()


  const createOrder = async () => {
    const backendUrl = process.env.BACKEND_URL + `api/create-paypal-order/`

    return await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      },
      body: JSON.stringify({
        cart: cartItems,
        amount: cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
  }
  const onApprove = async (data) => {
    const backendUrl = process.env.BACKEND_URL + `api/capture-paypal-order`
    return await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      },
      body: JSON.stringify({
        orderID: data.orderID,
        cart: cartItems,
        billingInfo,
        fromCart,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Successfully payment:', responseData)
        actions.clearLocalCart()
        navigate('/order/' + responseData.order.id)
      })
      .catch((error) => {
        console.error('Error capturing payment:', error)
      })
  }

  return (
    <PayPalButtons
    onClick={() => {
      if (!isBillingInfoValid) {
        alert('Please, fill all billing information and select a size')
      }
    }}
      createOrder={(data, actions) => {
        return createOrder(data, actions)
      }}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={stylePay}
      disabled={!isBillingInfoValid}
      fundingSource={undefined}
      forceReRender={[cartItems, isBillingInfoValid, billingInfo, store.shopping_cart]}
    />
  )
}

export default PaymentComponent
