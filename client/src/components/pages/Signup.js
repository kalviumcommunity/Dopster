import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import authsvg from '../assets/loginsvg.svg'
import google from '../assets/googlelogo.svg'
import '../css/signup.css'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from "react-router-dom";

import {Link} from 'react-router-dom'

const Signup = () => {
  const [name,setName]= useState("")
  const [password,setPassword]= useState("")
  const [email,setEmail]= useState("")
  const [confirmPassword,setConfirmPassword]= useState("")
 const [isLoading,setIsLoading] = useState(false)
 const navigate=useNavigate()

 const  Postdata = async()=>{
  setIsLoading(true)

     fetch("http://localhost:7000/signup",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        name:name,
        password:password,
        email:email
      })
    }).then(res=>res.json())
    .then(data=>{
      setIsLoading(false)
      console.log(data)
     if(data.error){
      toast.error(data.error)
     }
     else{
     
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setName("")
      toast.success(data.message)
     
      setTimeout(() => {
        window.confirm("redirecting you to login page")
        navigate('/login')
      }, 1500);
     }
      
      
  
    })
  }
  
  return (
    <>
    <div id='logo__svg_div' >
      <img src={logo} alt=""  />
    </div>
    <div className="display__flex" >
    <div id='signup__svg_div' >
      <img src={authsvg} alt="" id='signup__svg' />
    </div>
    <div id='signup__form' >
  
    <div id='form' >
    <h2 id='create__account'  >Create an account</h2>
   
      <div className='form__details'>
        <h4>Name</h4>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className='form__details'>
        <h4>Email</h4>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className='form__details'>
        <h4>Password</h4>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className='form__details'>
        <h4>Confirm Password</h4>
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
      </div>
     {isLoading===true?0    //      <Box sx={{display: 'flex'}}>
    //   <CircularProgress/>
    // </Box>
    :<button type='submit' onClick={()=>Postdata()} id='signup__button' >Sign up</button>}
      
      
      <div id='hr__div' >
      <hr />
      <p>or</p>
      
      <hr />
      </div>
    
    
   
      <button id='google__signin' ><img id='google' src={google} alt="" />Continue with Google</button>
    <h6 id='linkto__login'  >Already have an account? <Link to='/login' >Login now</Link></h6>
    </div>
 
    </div>
    </div>
    <ToastContainer/>
   
    </>
  )
}

export default Signup
