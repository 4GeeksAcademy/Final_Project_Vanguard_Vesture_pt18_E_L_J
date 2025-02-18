import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import logo from '../../img/logo.png'

const Navbar = () => {
  const { actions, store } = useContext(Context)

  useEffect(() => {
    if (store.token) {
      actions.getFavorites()
    }
  }, [store.token])

  function handleLogout() {
    actions
      .logout()
      actions.showNotification("Logout successful", "success")
  }



  return (
    <nav className='navbar navbar-dark bg-black '>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img
            style={{ width: '100px', objectFit: 'contain', border: 'none' }}
            src={store.images.logo || logo}
            alt='logo'
          />
          {store.token && (
            <>

            </>
          )}
        </Link>

        <div className='d-flex  end'>
          {!store.user.is_admin && store.token && (
            <div className='d-flex  end align-items-center'>
              <Link className='nav-link text-white' to='/cart'>
                <i className='fa-solid fa-cart-shopping' />
              </Link>
              <div className='nav-item dropdown dropstart'>
                <a
                  className='nav-link text-white'
                  href='#'
                  id='favoritesDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='fa-sharp text-white fa-solid fa-heart'></i>
                </a>
                <ul
                  style={{ width: '220px' }}
                  className='dropdown-menu bg-black text-white rounded'
                  aria-labelledby='favoritesDropdown'
                >
                  <li className='p-3 text-center border border-light rounded'>
                    <span>FAVORITES</span>
                  </li>
                  {store.favorites.map((product) => (
                    <li
                      key={product.id}
                      className='d-flex justify-content-between p-3'
                    >
                      <Link
                        className='text-white text-decoration-none d-flex align-items-center'
                        to={`/product/${product.id}`}
                      >
                        <div
                          style={{ width: '30px', height: '30px' }}
                          className='rounded-circle m-1 overflow-hidden'
                        >
                          <img
                            style={{ objectFit: 'cover' }}
                            className='w-100 h-100 img-cover'
                            src={product.images[0].image_url}
                            alt=''
                          />
                        </div>
                        <span className='ms-2'>{product.name}</span>
                      </Link>
                      <i
                        onClick={() => actions
                          .deleteFavorites(product.id)
                          .then((res) => actions.showNotification("Favorite deleted", "success"))
                        }
                        className='fa-solid fa-xmark btn'
                        style={{ color: '#eb000c' }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div
            className='collapse navbar-collapse me-2'
            id='navbarSupportedContent'
          >
            <ul className='navbar-nav  text-end mb-2  '>
              {JSON.stringify(store.user) === '{}' ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/login'>
                      LOGIN
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/signup'>
                      SIGNUP
                    </Link>
                  </li>{' '}
                </>
              ) : (
                <>
                  <li className='nav-item' style={{ maxWidth: "128px", overflow: "hidden" }}>

                    <span className='nav-item text-white h6'>
                      Hi, {store.user.first_name.toUpperCase()}
                    </span>

                  </li>
                  <li className='nav-item'>
                    <span
                      className='nav-link text-white'
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      LOGOUT
                    </span>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/settings'>
                      SETTINGS
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to={store.user.is_admin ? '/manage-orders' : '/orders'}>
                      ORDERS
                    </Link>
                  </li>
                </>
              )}

              {store.user.is_admin && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/admin'>
                      EDIT
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/create'>
                      CREATE
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            style={{ color: 'black', border: 'none', alignSelf: 'center' }}
            className='navbar-toggler pt-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fa-solid fa-bars fs-4 text-white'></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar