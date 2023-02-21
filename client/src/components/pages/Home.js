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
            <button id="upload__btn">Upload Projects</button>
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
        <div id="our__services">
          <div className="our__services-details">
            <img className="our__services-icon" src={uploadIcon} alt="" />
            <h3>Upload Projects</h3>
            <h4>
              Let the world see your projects and don't stay limited to github
            </h4>
          </div>
          <div className="our__services-details">
            <img className="our__services-icon" src={searchIcon} alt="" />
            <h3>Browse Projects</h3>
            <h4>Get free access to browse through all the projects</h4>
          </div>
          <div className="our__services-details">
            <img className="our__services-icon" src={qualityIcon} alt="" />
            <h3>Quaity Word</h3>
            <h4>Best quality projects you can find on the internet</h4>
          </div>
          <div className="our__services-details">
            <img className="our__services-icon" src={connectIcon} alt="" />
            <h3>Connect</h3>
            <h4>We give you a platform to connect with developers</h4>
          </div>
          <div className="our__services-details">
            <img className="our__services-icon" src={handIcon} alt="" />
            <h3>Find Freelancers</h3>
            <h4>Find the best talents available</h4>
          </div>
          <div className="our__services-details">
            <img className="our__services-icon" src={moneyIcon} alt="" />
            <h3>Work Opportunities</h3>
            <h4>Find limitless opportunities</h4>
          </div>
        </div>
      </div>

      <div id="footer">
        <footer>
          <div id="footer__logo-div">
            <img id="footer__logo" src={bluelogo} alt="" />
          </div>
          <div id="footer__main">
            <div className="footer__details">
              <h5>Support</h5>
              <a href="/">Help & Support</a>
              <a href="/">Trust & Safety</a>
            </div>
            <div className="footer__details">
              <h5>About</h5>
              <a href="/">About Us</a>
              <a href="/">Stories</a>
              <a href="/">How it Works</a>
            </div>
            <div className="footer__details">
              <h5>Terms</h5>
              <a href="/">Terms & Conditions</a>
              <a href="/">Privacy Policy</a>
            </div>
            <div className="footer__details">
              <h5>Reach Us</h5>
              <div>
                <img src={instagram} alt="" />
                <a href="/">Instagram</a>
              </div>
              <div>
                <img src={facebook} alt="" />
                <a href="/">Facebook</a>
              </div>
              <div>
                <img src={linkedin} alt="" />
                <a href="/">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
