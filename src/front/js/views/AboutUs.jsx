import React from "react";

const AboutUs = () => {
    return (
        <div className="text-white bg-black">
            <br />
            <h1 style={{ display: "flex", justifyContent: "center", fontStyle: "italic" }}>About us</h1>
            
            <p className="m-5" style={{ display: "flex", justifyContent: "center" }}>"Vanguard Vesture is a web e-commerce app developed to streamline the buying and selling activities of men's clothing. It features a PayPal payment system, search filters, a favorites list, and a web chat with immediate response for its customers. On the seller's side, it offers an article publishing system, editing capabilities, and app management, including images and order processing.

We aim to innovate using the latest technologies such as React, Python, Flask, and JavaScript for efficient development with room for future implementations to enhance the experience."</p>
<p style={{ display: "flex", justifyContent: "center" }}>OUR LOCATION</p>
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <br />
                
                <br />
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1503171342606!2d-84.21425622425349!3d10.004439772956855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9bec89eb921%3A0x33be443103056771!2sCity%20Mall%20Alajuela!5e0!3m2!1sen!2scr!4v1691122448479!5m2!1sen!2scr"
                    width="250"
                    height="250"
                    style={{ border: "0", display: "flex" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <br />
            <h1 style={{ display: "flex", justifyContent: "center", fontStyle: "italic" }}>who worked on this project?</h1>
            <div className="card-group bg-black text-white">
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://media.istockphoto.com/id/1316604492/es/foto/retrato-de-perfil-de-un-hombre-de-mediana-edad-sobre-fondo-gris.jpg?s=1024x1024&w=is&k=20&c=c78-CS2uy_XkOETodk9j15kBWzjk5kd3A_xrZ3F7OhI="
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Emmanuel Vargas</h5>
                        <p className="card-text text-center">
                            From Uruguay.
                        </p>
                        <a href="https://github.com/EmmanuelV22" target="_blank" rel="noopener noreferrer">
                            <p className="card-text text-center">
                                <small className="text-muted text-center">https://github.com/EmmanuelV22</small>
                            </p>
                        </a>
                    </div>
                </div>
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Luis Vela</h5>
                        <p className="card-text text-center">From Venezuela.</p>
                        <a href="https://github.com/luismvl" target="_blank" rel="noopener noreferrer">
                            <p className="card-text text-center">
                                <small className="text-muted text-center">https://github.com/luismvl</small>
                            </p>
                        </a>
                    </div>
                </div>
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Julio Vargas</h5>
                        <p className="card-text text-center">
                            From Costa Rica.
                        </p>
                        <a href="https://github.com/JulioV10" target="_blank" rel="noopener noreferrer">
                            <p className="card-text text-center">
                                <small className="text-muted text-center">https://github.com/JulioV10</small>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
