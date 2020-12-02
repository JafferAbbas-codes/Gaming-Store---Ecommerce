import React from "react";
import Pic1 from "../images/Pic1.png";
import Pic2 from "../images/Pic2.png";
import Pic3 from "../images/Pic3.png";


const Home = () => (
  <div>
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="3000"
      >
        <ol className="carousel-indicators" >
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active" 
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1" ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={Pic1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Pic2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Pic3} alt="Third slide" />
          </div>
        </div>
        
      </div>
    </div>
    <hr style={{backgroundColor: "aqua"}}/>
    
  </div>
);

export default Home;
