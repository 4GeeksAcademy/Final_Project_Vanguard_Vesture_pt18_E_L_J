import React, { useContext, useState } from 'react';
import Navbar from '../component/Navbar.jsx';
import SettingsForm from '../component/SettingsForm.jsx';
import { Context } from '../store/appContext';

const Settings = () => {
  const { actions, store } = useContext(Context);

  const {
    email,
    first_name,
    last_name,
    phone,
    location,
    address,
  } = store.user;

  const [isOpen, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const openModal = () => {
    setOpen(true);
  };

  const changeModalDelete = () => {
    setOpenDelete(!openDelete);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    actions.deleteUser();
    closeModal();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h2>Account Settings</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>First Name:</strong> {first_name}</p>
        <p><strong>Last Name:</strong> {last_name}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Address:</strong> {address}</p>
        <button className="btn btn-danger" onClick={changeModalDelete}>
          Delete Account
        </button>
        <button className="btn btn-primary" onClick={openModal}>
          Edit Account
        </button>
      </div>
      {openDelete && (
        
          <div tabIndex="-1"
            style={{
            display: openDelete ? 'block' : 'none',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} className="modal show mt-5 w-75 ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="contactModalLabel">
                  Are you sure?
                </h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={changeModalDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
      )}
      <SettingsForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default Settings;



