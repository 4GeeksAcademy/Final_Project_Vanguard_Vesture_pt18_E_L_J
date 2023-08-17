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
    actions.deleteUser();
    closeModal();
  };

  return (
    <div className="bg-white container-fluid pt-2">
      <div style={{ heigth: "600px" }} className=" container mx-auto d-flex row justify-content-center mt-5">
        <h1 className='pb-5'>Account Settings</h1>
        <p className=' col-4 overflow-hidden'><strong>Email:</strong> {email}</p>
        <p className=' col-3'><strong>First Name:</strong> {first_name}</p>
        <p className=' col-3'><strong>Last Name:</strong> {last_name}</p>
        <p className=' col-3'><strong>Phone:</strong> {phone}</p>
        <p className=' col-3'><strong>Location:</strong> {location}</p>
        <p className=' col-3'><strong>Address:</strong> {address}</p>
        {!store.user.is_admin && <button className="btn btn-danger mt-3" onClick={changeModalDelete}>
          Delete Account
        </button>}
        <button style={{ maxHeight: "60px" }} className="btn bg-black mt-3 mb-5 text-white mx-auto col" onClick={openModal}>
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



