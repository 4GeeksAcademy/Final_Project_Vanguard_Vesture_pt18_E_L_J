import React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import ScrollToTop from './component/scrollToTop'
import { BackendURL } from './component/backendURL'
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
import Feactures from './views/Feactures.jsx'
import Footer from './component/Footer.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'
import ProductList from './views/ProductList.jsx'
import CheckoutProduct from './views/CheckoutProduct.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import injectContext from './store/appContext'

const initialOptions = {
  clientId:
    'AbO_LEPpQ-uq7z8NWvdqLth9q1Rgi-MxjpTnGfOe809Ruy-TBzJk2wJg9-0bKzvMU243cIiyVuAcMKMD',
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
    <div className='d-flex flex-column h-100 min-vh-100'>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <div className='flex-grow-1'>
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
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/feactures' element={<Feactures />} />

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
