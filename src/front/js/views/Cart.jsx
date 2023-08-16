import React, { useContext, useEffect } from 'react';
import Navbar from '../component/Navbar.jsx';
import CartProduct from '../component/CartProduct.jsx';
import PaymentComponent from '../component/PaymentComponent.jsx';
import { Context } from '../store/appContext.js';

const Cart = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    if (store.token) {
      actions.validateToken();
    }
  }, [store.token]);

  const cost = actions.getTotalCart();

  const clearCart = async () => {
    const shoppingCart = store.shopping_cart;

    for (const item of shoppingCart) {
      await actions.deleteShoppingCart(item.product.id, item.size.id);
    }

    console.log('Cart cleared');
  };

  return (
    <div className="bg-black text-white d-flex flex-wrap gap-2 justify-content-center">
      {store.shopping_cart && store.shopping_cart.length > 0 ? (
        <>
          {store.shopping_cart.map((cartItem) => (
            <div className="d-flex text-center w-100" key={cartItem.product.id}>
              <CartProduct index={cartItem.product.id} cartItem={cartItem} />
            </div>
          ))}
          <h2 className='text-center'>Total Order: U$S {cost}</h2>
          <div className="d-flex justify-content-center">
            <PaymentComponent cost={cost} />
            <button
              onClick={() => clearCart()}
              style={{ maxHeight: '40px' }}
              className="btn btn-danger m-3 rounded-pill"
            >
              CANCEL ORDER
            </button>
          </div>
        </>
      ) : (
        <div className="m-3">
          <h2 className='text-center'>You haven't items in your cart</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
