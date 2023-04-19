import React from "react";

import bluelogo from "../assets/bluelogo.svg";
import { Link } from "react-router-dom";
import {
  AiOutlineCopyright,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";
import "../css/footer.css";
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
            <Link to="/help&support">
              <h4 className="footer-link">Help & Support</h4>
            </Link>
            <h4 className="footer-link">Trust & Safety</h4>
          </div>

          <div className="footer__details">
            <h5>About</h5>
            <h4 className="footer-link">About Us</h4>
            <h4 className="footer-link">Stories</h4>
            <Link to="/how-it-works">
              <h4 className="footer-link">How it Works</h4>
            </Link>
          </div>
          <div className="footer__details">
            <h5>Terms</h5>
            <Link to="/term-and-conditions">
              <h4 className="footer-link">Terms & Conditions</h4>
            </Link>
            <Link to="/privacy-policy">
              <h4 className="footer-link">Privacy Policy</h4>
            </Link>
          </div>
        </div>
        <hr className="footer-hr" />
        <div id="display-footer">
          <p style={{ display: "flex", alignItems: "center", margin: "1vh" }}>
            <AiOutlineCopyright /> Copyright. All rights reserved. 2023
          </p>
          <div id="socials">
            <a
              href="https://www.instagram.com/dopster.platform/"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineInstagram size={30} />
            </a>

            <a href="">
              <AiOutlineFacebook size={30} />
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-kumar-685119253/"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineLinkedin size={30} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
