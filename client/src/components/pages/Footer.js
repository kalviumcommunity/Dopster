import React from 'react'

import bluelogo from "../assets/bluelogo.svg";
import { useNavigate } from 'react-router-dom';
import {AiOutlineCopyright,AiOutlineFacebook,AiOutlineInstagram,AiOutlineLinkedin} from 'react-icons/ai'
import '../css/footer.css'
const Footer = () => {
  const navigate = useNavigate()
  return (
    
    <div id="footer">
    <footer>
      <div id="footer__logo-div">
        <img id="footer__logo" src={bluelogo} alt="" />
      </div>

      
      <div id="footer__main">
        
        <div className="footer__details">
          <h5>Support</h5>
          <a href="#" onClick={()=>{
            navigate('/help&support')
          }} >Help & Support</a>
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
          <a href="/term-and-conditions" >Terms & Conditions</a>
          <a href="/">Privacy Policy</a>
        </div>

      </div>
      <hr className='footer-hr'  />
      <div id='display-footer'  >
      <p style={{display:'flex',alignItems:"center",margin:"1vh"}} ><AiOutlineCopyright/> Copyright. All rights reserved. 2023</p>
      <div id='socials'  >
          
            <AiOutlineInstagram size={30}/>
           
          
          
          <AiOutlineFacebook size={30}/>
        
      

            <AiOutlineLinkedin size={30}/>
           
      
        </div>
      </div>
     
    </footer>
  </div>
  )
}

export default Footer
