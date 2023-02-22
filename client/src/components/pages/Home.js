import React from "react";
import logo from "../assets/logo.svg";
import homesvg from "../assets/home.svg";
import "../css/home.css";
import ResponsiveAppBar from "../Navbar";
import uploadIcon from "../assets/uploadicon.svg";
import moneyIcon from "../assets/moneyicon.svg";
import connectIcon from "../assets/connecticon.svg";
import qualityIcon from "../assets/qualityicon.svg";
import searchIcon from "../assets/searchicon.svg";
import handIcon from "../assets/handicon.svg";
import bluelogo from "../assets/bluelogo.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import Offer from "./Offer";
import Footer from "./Footer";
const Home = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <div id="home__div">
        <div id="button-typography">
          <div id="primary__tagline">
            <h1>Open the door to New Opportunities</h1>
          </div>
          <div id="secondary__tagline">
            Be proud of your creations, share them with the world
          </div>
          <div id="buttons">
            <a id="upload__btn" href="/upload" >Upload Projects</a>
            <button id="browse__btn">Browse Projects</button>
          </div>
        </div>

        <div id="main__svg-div">
          <img id="main__svg" src={homesvg} alt="" />
        </div>
      </div>
      <div id="what-we-offer">
        <h1>What do we offer?</h1>
      </div>
      <div id="display">
        <Offer/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
