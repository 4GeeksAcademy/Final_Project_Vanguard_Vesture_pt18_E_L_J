import React, { useContext, useState } from 'react';
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
    actions
    .deleteUser()
    .then((res)=>actions.showNotification("User deleted","success"))
    .catch((err)=>actions.showNotification("Error deleting user","danger"))
    closeModal();
  };

  return (
    <div className="bg-white py-4">
      <div style={{ heigth: "600px" }} className=" container mx-auto row">
        <h1 className='mb-3'>Account Settings</h1>
        <p className='col-6 col-sm-4'><strong>First Name:</strong> {first_name}</p>
        <p className='col-6 col-sm-4'><strong>Last Name:</strong> {last_name}</p>
        <p className='col-12 col-sm-4 overflow-hidden'><strong>Email:</strong> {email}</p>
        <p className='col-6 col-sm-4'><strong>Location:</strong> {location}</p>
        <p className='col-12 col-sm-8'><strong>Address:</strong> {address}</p>
        <p className='col-6 col-sm-3'><strong>Phone:</strong> {phone}</p>
        {!store.user.is_admin && 
        <button className="btn btn-danger mt-3 col-12" onClick={changeModalDelete}>
          Delete Account
        </button>}
        <button style={{ maxHeight: "60px" }} className="btn bg-black mt-3 text-white mx-auto col-12" onClick={openModal}>
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
          <div className="modal-content bg-black text-white">
            <div className="modal-header bg-black text-white">
              <h5 className="modal-title " id="contactModalLabel">
                Are you sure?
              </h5>
            </div>
            <div className="modal-body bg-black text-white">
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
                className="btn btn-danger ms-4"
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



