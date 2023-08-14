import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

const Admin = () => {
  const { store } = useContext(Context)

  if (!store.user.is_admin) return <Navigate to='/' />

  return (
    <div>
      <h1>Soy Admin</h1>
    </div>
  )
}

export default Admin
