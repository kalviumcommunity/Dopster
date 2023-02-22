import React from 'react'
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import bluelogo from "../assets/bluelogo.svg";
const Footer = () => {
  return (
    
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
  )
}

export default Footer
