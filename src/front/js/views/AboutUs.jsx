import React from "react";
import julio from '../../img/julio.png'
import manu from '../../img/manu.jpg'
import luis from '../../img/luis.jpg'



const AboutUs = () => {
    return (
        <div className="bg-black text-white container-fluid pt-2 pb-5" style={{ minHeight: '100vh' }}>
            <br />
            <h1 style={{ display: "flex", justifyContent: "center", fontStyle: "italic",fontFamily: 'Helvetica' }}>About us</h1>

            <p className="m-5" style={{ display: "flex", justifyContent: "center" }}>"Vanguard Vesture is a web e-commerce app developed to streamline the buying and selling activities of men's clothing. It features a PayPal payment system, search filters, a favorites list, and a web chat with immediate response for its customers. On the seller's side, it offers an article publishing system, editing capabilities, and app management, including images and order processing.

                We aim to innovate using the latest technologies such as React, Python, Flask, and JavaScript for efficient development with room for future implementations to enhance the experience."</p>
            <h1 className="pb-3" style={{ display: "flex", justifyContent: "center" , fontStyle: "italic",fontFamily: 'Helvetica' }}>Where to find us</h1>
            <div className="" style={{ display: "flex", justifyContent: "center" }}>
                <br />

                <br />
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1503171342606!2d-84.21425622425349!3d10.004439772956855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9bec89eb921%3A0x33be443103056771!2sCity%20Mall%20Alajuela!5e0!3m2!1sen!2scr!4v1691122448479!5m2!1sen!2scr"
                    width="500"
                    height="300"
                    style={{ border: "0", display: "flex", borderRadius:"20px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <br />
            <h1 className="pb-3" style={{ display: "flex", justifyContent: "center", fontStyle: "italic" ,fontFamily: 'Helvetica'}}>Who worked on this project?</h1>
           


            <div className="container">
  <div className="row">
    <div className="col-12 col-md-4 mb-4">
      <div className="card bg-black text-white  ">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div
            className="rounded-circle overflow-hidden"
            style={{
              width: "200px",
              height: "200px"
            }}
          >
            <img
              src={manu}
              className="w-100 h-100"
              alt="Emmanuel Vargas"
              style={{ objectFit: "cover" , objectPosition:"center top"}}
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Emmanuel Vargas</h5>
          <p className="card-text text-center">From Uruguay </p>
          <p className="card-text text-center">Full Stack Developer</p>
          <a className="text-muted" href="https://github.com/EmmanuelV22" target="_blank" rel="noopener noreferrer">
            <p className="card-text text-center">
              <span className="text-muted text-white text-center">https://github.com/EmmanuelV22</span>
            </p>
          </a>
        </div>
      </div>
    </div>

    <div className="col-12 col-md-4 mb-4">
      <div className="card bg-black text-white  ">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div
            className="rounded-circle overflow-hidden"
            style={{
              width: "200px",
              height: "200px"
            }}
          >
            <img
              src={luis}
              className="w-100 h-100"
              alt="Luis Vela"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Luis Vela</h5>
          <p className="card-text text-center">From Venezuela </p>
          <p className="card-text text-center">Full Stack Developer</p>
          <a className="text-muted" href="https://github.com/luismvl" target="_blank" rel="noopener noreferrer">
            <p className="card-text text-center">
              <span className="text-muted text-center">https://github.com/luismvl</span>
            </p>
          </a>
        </div>
      </div>
    </div>

    <div className="col-12 col-md-4 mb-4">
      <div className="card bg-black text-white  ">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div
            className="rounded-circle overflow-hidden"
            style={{
              width: "200px",
              height: "200px"
            }}
          >
            <img
              src={julio}
              className="w-100 h-100"
              alt="Julio Vargas"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Julio Vargas</h5>
          <p className="card-text text-center">From Costa Rica </p>
          <p className="card-text text-center">Full Stack Developer</p>
          <a className="text-muted" href="https://github.com/JulioV10" target="_blank" rel="noopener noreferrer">
            <p className="card-text text-center">
              <span className="text-muted text-center">https://github.com/JulioV10</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>










        </div>
    );
};

export default AboutUs;
