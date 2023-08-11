import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import NewProduct from '../component/NewProduct.jsx'


const Create = () => {
  const { store } = useContext(Context)

  if (!store.user.is_admin) return <Navigate to='/' />

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 className='my-2'>Create product</h1>
        <NewProduct />
      </div>
    </div>
  )
}

export default Create
