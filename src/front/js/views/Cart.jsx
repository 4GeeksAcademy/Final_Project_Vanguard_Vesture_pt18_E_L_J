import React, { useContext, useEffect } from 'react'
import Navbar from '../component/Navbar.jsx'
import CartProduct from '../component/CartProduct.jsx'
import PaymentComponent from '../component/PaymentComponent.jsx'




import { Context } from '../store/appContext.js'

const Cart = () => {
  const { actions, store } = useContext(Context)
  useEffect(() => {
    if (store.token) {
      actions.validateToken();
    }
  }, [store.token]);

  
  const cost = actions.getTotalCart()

  const clearCart = async () => {
    const shoppingCart = store.shopping_cart;

    for (const item of shoppingCart) {
      await actions.deleteShoppingCart(item.product.id, item.size.id);
    }

    console.log('Cart cleared');
  };


  return (
    <div>
      <h1 className=' d-flex justify-content-center align-items-center'>Cart</h1>
      {store.shopping_cart && store.shopping_cart.length > 0 ? (
        store.shopping_cart.map((cartItem) => (
          <div className="d-flex text-center w-100" key={cartItem.product.id}>
            <CartProduct
              index={cartItem.product.id}
              cartItem={cartItem}
            />
          </div>

        ))

      ) : (
        <h1 className='text-center'>You haven't items in you cart</h1>
      )}
      <h1 className='text-center'>Total Pay: U$S {actions.getTotalCart()}</h1>
      <div className="d-flex justify-content-center">
        {/* <button className="btn btn-success m-3">PAY ORDER</button> */}
        <PaymentComponent
        cost={cost}/>
        <button onClick={() => clearCart()} className="btn btn-danger m-3">CANCEL ORDER</button>
      </div>

    </div>
  )
}

export default Cart