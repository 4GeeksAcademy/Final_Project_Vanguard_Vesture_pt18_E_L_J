import React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import ScrollToTop from './component/scrollToTop'
import { BackendURL } from './component/backendURL'
import injectContext from './store/appContext'

import Login from './views/Login.jsx'
import Navbar from './component/Navbar.jsx'
import Home from './views/Home.jsx'
import Signup from './views/SignUp.jsx'
import Cart from './views/Cart.jsx'
import Settings from './views/Settings.jsx'
import Admin from './views/Admin.jsx'
import Create from './views/CreateProduct.jsx'
import ProductDetails from './views/ProductDetails.jsx'
import AboutUs from './views/AboutUs.jsx'
import Features from './views/Features.jsx'
import Footer from './component/Footer.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'
import ProductList from './views/ProductList.jsx'
import CheckoutProduct from './views/CheckoutProduct.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import UserOrders from './views/UserOrders.jsx'
import OrderDetials from './views/OrderDetials.jsx'
import AdminOrders from './views/AdminOrders.jsx'


const initialOptions = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
}

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || ''

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == '')
    return <BackendURL />

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <div>
            <PayPalScriptProvider option={initialOptions}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/clothes'
                  element={<ProductList category='clothes' />}
                />
                <Route
                  path='/footwear'
                  element={<ProductList category='shoes' />}
                />
                <Route
                  path='/accesories'
                  element={<ProductList category='accessories' />}
                />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='*' element={<h1>Not found!</h1>} />
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/features' element={<Features />} />

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/create' element={<Create />} />
                  <Route
                    path='/checkout/:productID'
                    element={<CheckoutProduct />}
                  />
                  <Route path='/orders' element={<UserOrders />} />
                  <Route path='/manage-orders' element={<AdminOrders />} />
                  <Route path='/order/:orderID' element={<OrderDetials />} />
                </Route>
              </Routes>
            </PayPalScriptProvider>
          </div>

          <Outlet />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)
