import React from 'react'
import ResponsiveAppBar from './Navbar'
import Errorimg from '../assets/Final404.svg'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
  return (
    <div>
      <ResponsiveAppBar/>

      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <img src={Errorimg} alt="" />
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <button onClick={()=>{navigate('/')}} style={{backgroundColor:"#1db0b9",fontWeight:"bold",border:'none'}}>Go to Home</button>
      </div>
    </div>
  )
}

export default Error404
