import React, { useContext } from 'react'
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom'

const Home = () => {
  const { actions, store } = useContext(Context)

  // const { actions, store } = useContext(Context)
  // console.log(store.user)

  const cardImageStyle = {
    height: '400px',
    objectFit: 'cover',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '10px',
  }

  return (
    <div>
      <div className='container-fluid card-group'>
        <div className='card'>
          <Link className='clothesImage' to='/clothes'>
            <img
              src='https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
              className='card-img-top'
              alt='...'
              style={cardImageStyle}
            />
          </Link>
          <div className='card-body'>
            <h5 className='card-title'>CLOTHES</h5>
            <p className='card-text'>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div className='card-footer'>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </div>
        </div>
        <div className='card'>
          <Link className='FootwearImage' to='/footwear'>
            <img
              src='https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
              className='card-img-top'
              alt='...'
              style={cardImageStyle}
            />
          </Link>
          <div className='card-body'>
            <h5 className='card-title'>FOOTWEAR</h5>
            <p className='card-text'>This card ha.</p>
          </div>
          <div className='card-footer'>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </div>
        </div>
        <div className='card'>
          <Link className='accesoriesImage' to='/accesories'>
            <img
              src='https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
              className='card-img-top'
              alt='...'
              style={cardImageStyle}
            />
          </Link>
          <div className='card-body'>
            <h5 className='card-title'>ACCESSORIES</h5>
            <p className='card-text'>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div className='card-footer'>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  )
}


	return (
		<div>

			<div   className=" card-group text-white bg-black">
			
<div style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 6%, rgba(128,128,128,1) 30%, rgba(255,255,255,1) 50%, rgba(138,138,138,1) 70%, rgba(0,0,0,1) 94%)" }} className="card border-0">
  <div className="bg-transparent">
    <Link
      className='clothesImage'
      to='/clothes'
      style={{ position: "relative", display: "block" }}
      onMouseEnter={() => {
        document.querySelector('.clothesImage h5').style.opacity = 0;
        document.querySelector('.clothesImage').style.transform = 'scale(105%)';
        document.querySelector('.clothesImage').style.zIndex = '9999';
        document.querySelector('.clothesImage img').style.filter = 'brightness(100%)';
      }}
      onMouseLeave={() => {
        document.querySelector('.clothesImage h5').style.opacity = 1;
        document.querySelector('.clothesImage').style.transform = 'scale(100%)';
        document.querySelector('.clothesImage').style.zIndex = 'auto';
        document.querySelector('.clothesImage img').style.filter = 'brightness(50%)';
      }}
    >
      <img
        src={store.images.clothes ? store.images.clothes : "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}
        className="card-img-top"
        alt="..."
        style={{ ...cardImageStyle, filter: "brightness(50%)" , borderRadius:"20px" }}
      />
      <h5
        className="card-title text-center"
        style={{
          position: "absolute",
          fontFamily: "Helvetica",
          fontStyle: "italic",
          fontSize: "3rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          color: "#fff",
          backgroundColor: "transparent",
          padding: "10px",
          borderRadius: "5px",
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
        }}>CLOTHES</h5>
    </Link>
    <div className="card-body">
      <p className="card-text text-center">Here you can find the latest innovations in the world of fashion</p>
    </div>
  </div>
</div>



<div style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 6%, rgba(128,128,128,1) 30%, rgba(255,255,255,1) 50%, rgba(138,138,138,1) 70%, rgba(0,0,0,1) 94%)" }} className="card border-0">
  <div className="bg-transparent">
    <Link
      className='FootwearImage'
      to='/footwear'
      style={{ position: "relative", display: "block" }}
      onMouseEnter={() => {
        document.querySelector('.FootwearImage h5').style.opacity = 0;
        document.querySelector('.FootwearImage').style.transform = 'scale(105%)';
        document.querySelector('.FootwearImage').style.zIndex = '9999';
        document.querySelector('.FootwearImage img').style.filter = 'brightness(100%)';
      }}
      onMouseLeave={() => {
        document.querySelector('.FootwearImage h5').style.opacity = 1;
        document.querySelector('.FootwearImage').style.transform = 'scale(100%)';
        document.querySelector('.FootwearImage').style.zIndex = 'auto';
        document.querySelector('.FootwearImage img').style.filter = 'brightness(50%)';
      }}
    >
      <img
        src={store.images.shoes ? store.images.shoes : "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"}
        className="card-img-top"
        alt="..."
        style={{ ...cardImageStyle, filter: "brightness(50%)" , borderRadius:"20px" }}
      />
      <h5
        className="card-title text-center"
        style={{
          position: "absolute",
          fontFamily: "Helvetica",
          fontSize: "3rem",
          top: "50%",
          fontStyle: "italic",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          color: "#fff",
          backgroundColor: "transparent",
          padding: "10px",
          borderRadius: "5px",
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
        }}>FOOTWEAR</h5>
    </Link>
    <div className="card-body">
      <p className="card-text text-center">Take a tour of our best and most comfortable footwear</p>
    </div>
  </div>
</div>




				<div style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 6%, rgba(128,128,128,1) 30%, rgba(255,255,255,1) 50%, rgba(138,138,138,1) 70%, rgba(0,0,0,1) 94%)", overflowX: "hidden" }}  className="card border-0">
  <div className="bg-transparent">
    <Link
      className='accesoriesImage'
      to='/accesories'
      style={{ position: "relative", display: "block" }}
      onMouseEnter={() => {
        document.querySelector('.accesoriesImage h5').style.opacity = 0;
        document.querySelector('.accesoriesImage').style.transform = 'scale(105%)';
        document.querySelector('.accesoriesImage').style.zIndex = '9999';
        document.querySelector('.accesoriesImage img').style.filter = 'brightness(100%)';
      }}
      onMouseLeave={() => {
        document.querySelector('.accesoriesImage h5').style.opacity = 1;
        document.querySelector('.accesoriesImage img').style.filter = 'brightness(50%)';
        document.querySelector('.accesoriesImage').style.zIndex = 'auto';
        document.querySelector('.accesoriesImage').style.transform = 'scale(100%)';
      }}
    >
      <img
        src={store.images.accessories ? store.images.accessories : "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
        className="card-img-top"
        alt="..."
        style={{ ...cardImageStyle, filter: "brightness(50%)", borderRadius:"20px" }}
      />
      <h5
        className="card-title text-center"
        style={{
          position: "absolute",
          fontFamily: "Helvetica",
          fontSize: "3rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          fontStyle: "italic",
          color: "#fff",
          backgroundColor: "transparent",
          padding: "10px",
          borderRadius: "5px",
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
        }}>ACCESSORIES</h5>
    </Link>
    <div className="card-body">
      <p className="card-text text-center">We have a high range of accessories to increase the style of man</p>
    </div>
  </div>
</div>


			</div>
		</div>

	)

};

export default Home;

