import React from 'react'

import uploadIcon from "../assets/uploadicon.svg";
import moneyIcon from "../assets/moneyicon.svg";
import connectIcon from "../assets/connecticon.svg";
import qualityIcon from "../assets/qualityicon.svg";
import searchIcon from "../assets/searchicon.svg";
import handIcon from "../assets/handicon.svg";

const Offer = () => {
  return (
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

  )
}

export default Offer
