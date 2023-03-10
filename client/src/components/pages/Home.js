import React,{useContext} from "react";

import homesvg from "../assets/home.svg";
import "../css/home.css";
import ResponsiveAppBar from "./Navbar";
import { Typewriter } from 'react-simple-typewriter'
import Footer from "./Footer";
import { UserContext } from '../../App';
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const uploadfunc=()=>{
    if(state){
      navigate('/upload')
    }
    else{
      navigate('/login')
    }
  }
  return (
    <div>
      <ResponsiveAppBar />
      <div id="home__div">
        <div id="button-typography">
          <div id="primary__tagline">
            <h1> <Typewriter
             words={['Open the door for', 'New opportunities','With Dopster']}
            loop={10}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={80}
            delaySpeed={1000}
          /></h1>
          </div>
          
          <div id="secondary__tagline">
            Be proud of your creations, share them with the world
          </div>
          <div id="buttons">
            <button onClick={()=>uploadfunc()} id="upload__btn" >Upload Projects</button>
            <button id="browse__btn" onClick={()=>navigate("/allprojects")}>Browse Projects</button>
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

