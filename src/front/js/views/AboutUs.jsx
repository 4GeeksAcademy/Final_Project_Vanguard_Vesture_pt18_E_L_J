import React from "react";


const AboutUs = () => {
    return (
        <div className="bg-black text-white container-fluid pt-2 pb-5" style={{ minHeight: '100vh' }}>
            <br />
            <h1 style={{ display: "flex", justifyContent: "center", fontStyle: "italic",fontFamily: 'Helvetica' }}>About us</h1>

            <p className="m-5" style={{ display: "flex", justifyContent: "center" }}>"Vanguard Vesture is a web e-commerce app developed to streamline the buying and selling activities of men's clothing. It features a PayPal payment system, search filters, a favorites list, and a web chat with immediate response for its customers. On the seller's side, it offers an article publishing system, editing capabilities, and app management, including images and order processing.

                We aim to innovate using the latest technologies such as React, Python, Flask, and JavaScript for efficient development with room for future implementations to enhance the experience."</p>
            <h1 className="pb-3" style={{ display: "flex", justifyContent: "center" , fontStyle: "italic",fontFamily: 'Helvetica' }}>Where to find us</h1>
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
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
            <div className="card-group m-5 bg-black text-white">
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/16:9/w_2560%2Cc_limit/1442809583"
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Emmanuel Vargas</h5>
                        <p className="card-text text-center">
                            From Uruguay & 4Geeks Academy
                        </p>
                        <a className="text-muted" href="https://github.com/EmmanuelV22" target="_blank" rel="noopener noreferrer" >
                            <p className="card-text text-center">
                                <span className="text-muted text-white text-center">https://github.com/EmmanuelV22</span>
                            </p>
                        </a>
                    </div>
                </div>
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://www.lanacion.com.ar/resizer/ULc2AF1qUigN2EWOfU2mn0KsqPw=/420x280/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UIKEOAARJ5EDLCU32KTDICNHKA.jpg"
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Luis Vela</h5>
                        <p className="card-text text-center">From Venezuela & 4Geeks Academy</p>
                        <a className="text-muted" href="https://github.com/luismvl" target="_blank" rel="noopener noreferrer">
                            <p className="card-text text-center">
                                <span className="text-muted text-center">https://github.com/luismvl</span>
                            </p>
                        </a>
                    </div>
                </div>
                <div className="card bg-black text-white mx-auto" style={{ width: "300px" }}>
                    <img
                        src="https://www.baenegocios.com/__export/1653671011341/sites/cronica/img/2022/05/27/mbappe.jpeg_651172604.jpeg"
                        className="card-img-top rounded-circle"
                        alt="..."
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">Julio Vargas</h5>
                        <p className="card-text text-center">
                            From Costa Rica & 4Geeks Academy
                        </p>
                        <a className="text-muted" href="https://github.com/JulioV10" target="_blank" rel="noopener noreferrer">
                            <p className="card-text text-center">
                                <span className="text-muted text-center">https://github.com/JulioV10</span>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
