import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate, Navigate, useLocation } from 'react-router'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { actions, store } = useContext(Context)
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    actions
      .login(email, password)
      .then((res) => navigate(from, { replace: true }))
      .catch((err) => {
        alert('Incorrect user/password')
        console.log(err)
        console.log(err.httpStatus)
      })
  }

  const handleRedirect = () => {
    navigate('/signup')
  }

  if (JSON.stringify(store.user) !== '{}') return <Navigate to={from} />

  return (
    <div
      style={{
        background:
          'linear-gradient(0deg, rgba(0,0,0,1) 6%, rgba(128,128,128,1) 30%, rgba(255,255,255,1) 50%, rgba(138,138,138,1) 60%, rgba(0,0,0,1) 84%)',
      }}
      className='p-5'
    >
      <h1
        className='mx-auto pb-3 text-center text-white'
        style={{ fontSize: '3rem' }}
      >
        Welcome Back to Vanguard Vesture!
      </h1>
      <form
        style={{ borderRadius: '25px' }}
        className=' card col-12 col-lg-6 mx-auto text-white bg-black'
        onSubmit={handleSubmit}
      >
        <div className='m-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Email address</h5>
          </label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='m-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            <h5>Password </h5>
          </label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <button
          type='submit'
          className='btn btn-light rounded-pill   mx-auto m-3'
        >
          <h5>Enter</h5>
        </button>
      </form>
      <h5
        className='mt-3 text-center  w-75 mx-auto text-white'
        style={{ cursor: 'pointer', padding: '20px' }}
        onClick={handleRedirect}
      >
        You haven't account? Click Here to Register!
      </h5>
    </div>
  )
}

export default Login
