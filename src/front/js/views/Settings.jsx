import React from 'react'
import Navbar from '../component/Navbar.jsx'
import SettingsForm from '../component/SettingsForm.jsx';
import { Context } from '../store/appContext';
import { useContext , useState } from 'react';

const Settings = () => {

  const { actions, store } = useContext(Context)

  const {
    email,
    first_name,
    last_name,
    phone,
    location,
    address,
} = store.user;

const [Open, setOpen] = useState(false);


  const openModal = () => {
    setOpen(true);
  };


  const closeModal = () => {
    setOpen(false);
  };



  return (
    <div>
      <Navbar />
      <div className="container">
            <h2>Account Settings</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>First Name:</strong> {first_name}</p>
            <p><strong>Last Name:</strong> {last_name}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Address:</strong> {address}</p>
            <button className="btn btn-danger" onClick={()=>actions.deleteUser()}>
                    Delete Account
            </button>
            <button className="btn btn-primary" onClick={openModal}>
                    Edit Account
            </button>
        </div>
        <SettingsForm
        isOpen={Open}
        onClose={closeModal}
      />
      
    </div>
  )
}

export default Settings
