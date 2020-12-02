import React from 'react';
import "../App.css";

function Footer(props) {
    return(
    <div>
        <div  className="container" style={{color:"white"}}>
            <div className="footer" style={{backgroundColor:"#3A3A39"}}>
            <div className=" row justify-content-center">             
                <div className="col-2 mt-2">
                    <h6>Our Products</h6>
                    <div><ul className="list-unstyled">
                        <li>Mouse</li>
                        <li>Keyboard</li>
                        <li>Mouse Pad</li>
                    </ul>
                    </div>
                </div>
                <div className="col-2 mt-2">
                <h6>Mouse</h6>
                    <div><ul className="list-unstyled">
                        <li>Oscar Optical</li>
                        <li>Oscar Lite Optical</li>
                    </ul>
                    </div> 
                </div>
                <div className="col-1 mt-2">
                <h6>Keyboard</h6>
                </div>
                <div className="col-1 mt-2">
                <h6>Mouse Pad</h6>
                </div>
                <div className="col-2 mt-2">
                <h6>Support</h6>
                    <div><ul className="list-unstyled">
                        <li>Contact Us</li>
                        <li>Tech Support</li>
                        <li>Warranty</li>
                        <li>Download</li>
                    </ul>
                    </div>
                </div>
                <div className="col-2 mt-2">
                <h6>Company</h6>
                    <div><ul className="list-unstyled">
                        <li>About Us</li>
                    </ul>
                    </div>
                </div>
                
            </div>
            <div className="row text-center mb-2" >             
                <div className="col-12">
                    <p>© Copyright 2020 All Right Reserved</p>
            </div>
            </div>
            
        </div>
        </div>
    </div>
    )
}

export default Footer;