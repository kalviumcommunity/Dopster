import React, { useState,useEffect } from 'react'
import ResponsiveAppBar from './Navbar'
import '../css/projects.css'
import Footer from './Footer'

const Projects = () => {
  const [data,setData]= useState([])
  useEffect(()=>{
    fetch("http://localhost:7000/projects/allprojects",{

  }).then(res=>res.json())
  .then(result=>{
    console.log(result.posts)
    setData(result.posts)
  })
  },[])
  return (
    <>
    
    <div id='project-main-div' >
      <ResponsiveAppBar/>
      <div id='top-section' >
        <div id='project-h2' > <h2>Wanna upload your own project?</h2></div>
        <div id='upload-button-div' > <button id='project-upload' >Upload Now</button></div>
       
       
      </div>
      <hr className='hr'  />
      <h1 style={{textAlign:'center'}} >Projects</h1>
      <div id="all-cards">
{
  data.map(item=>{
    return(
<div className="card" ><img src="" alt="" />
        <h3>{item.title}</h3>
        <h5>Like</h5>
        <hr className='hr' />
        <p>By: {item.postedBy.name}</p>
        </div>
    )
  })
}




      </div>
    
    </div>
    <Footer/>
    </>
  )
}

export default Projects