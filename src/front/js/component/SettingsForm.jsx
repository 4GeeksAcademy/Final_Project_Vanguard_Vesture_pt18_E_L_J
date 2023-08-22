import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'

const SettingsForm = ({ isOpen, onClose }) => {
  const { store, actions } = useContext(Context)

  const [email, setEmail] = useState(store.user.email)
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState(store.user.first_name)
  const [last_name, setLastName] = useState(store.user.last_name)
  const [phone, setPhone] = useState(store.user.phone)
  const [location, setLocation] = useState(store.user.location)
  const [address, setAddress] = useState(store.user.address)

  const handleSent = () => {
    const user = {
      email,
      password,
      first_name,
      last_name,
      phone,
      location,
      address,
    }

    if (
      email == '' ||
      first_name == '' ||
      last_name == '' ||
      phone == '' ||
      location == '' ||
      address == ''
    ) {
      actions.showNotification('Complete all fields', 'danger')
    } else {
      actions
        .editUser(user)
        .then((res) => {
          actions.showNotification('User updated', 'success')
          onClose()
        })
        .catch((err) =>
          actions.showNotification('Error updating user', 'danger')
        )
        .finally(() => {
          setEmail('')
          setPassword('')
          setFirstName('')
          setLastName('')
          setPhone('')
          setLocation('')
          setAddress('')
        })
    }
  }

  return (
    <div
      className={`modal ${isOpen ? 'show' : ''}`}
      tabIndex='-1'
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className='modal-dialog text-white bg-black  border rounded-3'>
        <div className='modal-content bg-black '>
          <div className='modal-header'>
            <h5 className='modal-title' id='contactModalLabel'>
              Edit Information
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={onClose}
            ></button>
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='If you want to change your password, enter it here'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='first_name' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='first_name'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='last_name' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='last_name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <input
                type='text'
                className='form-control'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='location' className='form-label'>
                Location
              </label>
              <input
                type='text'
                className='form-control'
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className='modal-footer justify-content-start'>
            <button
              type='button'
              className='btn btn-danger add'
              data-bs-dismiss='modal'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn add btn-dark'
              onClick={handleSent}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsForm
