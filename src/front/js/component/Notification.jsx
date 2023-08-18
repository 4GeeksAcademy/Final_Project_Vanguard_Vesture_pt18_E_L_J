import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'

const Notification = () => {
  const { actions, store } = useContext(Context)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (store.response.type !== '' && store.response.message !== '') {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [store.response]);

  if (!isVisible) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "70%", zIndex: "9999999" }}>


      <div className={`alert alert-${store.response.type} fade w-100 alert-dismissible show`} role="alert">
        {store.response.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>



    </div>
  )
}

export default Notification
