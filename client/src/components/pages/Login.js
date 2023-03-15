import React,{useState,useContext,useEffect} from 'react'
import {UserContext} from '../../App'
import logo from '../assets/logo.svg'
import authsvg from '../assets/loginsvg.svg'
import google from '../assets/googlelogo.svg'
import '../css/login.css'
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate} from "react-router-dom";

  import HashLoader from 'react-spinners/HashLoader'

const Login = () => {
  const {dispatch} = useContext(UserContext)
  
  const [password,setPassword]= useState("")
  const [email,setEmail]= useState("")
 const [isLoading,setIsLoading] = useState(false)
  const navigate=useNavigate()
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])

 
  const  Postdata = async()=>{
    setIsLoading(true)
  
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    toast.warning("invalid email")
    setIsLoading(false)
    return
    
  }


     fetch(process.env.REACT_APP_API+"/signin",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        password:password,
        email:email
      })
    }).then(res=>res.json())
    .then(data=>{
      setIsLoading(false)
      console.log(data)
     if(data.error){
      toast.error(data.error)
      setEmail("")
      setPassword("")
     }
     else{
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      dispatch({type:"USER",payload:data.user})
     setTimeout(() => {
     
        navigate('/')
     
       
      
      }, 500);
     }
      
      
  
    })
  }
  return (
    <div className={loading?"loader":''}  >
      {
         loading? <HashLoader color="#36db" />:
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
    <h2 id='welcome__back' >Welcome Back!!!</h2>
   
      
      <div className='form__details'>
        <h4>Email</h4>
        <input className='input' type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='form__details'>
        <h4>Password</h4>
        <input type="password" className='input' placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
        <h6 onClick={()=>{
          navigate('/reset-password')
        }} style={{color:"blue"}} >Forgot Password?</h6>
      </div>
      
      {isLoading===true?    <Box sx={{display: 'flex'}}>
      <CircularProgress/>
    </Box>:
      <button type='submit' id='signup__button' onClick={()=>Postdata()} >Login</button>}
      
      <div id='hr__div' >
      <hr />
      <p>or</p>
      <hr />
      </div>
    
   
      <button id='google__signin' onClick={()=>{
        navigate('/googleauth')
      }} ><img id='google' src={google} alt="" />Continue with Google</button>
    <h6 id="linkto__signup" >Don't have an account? <Link to='/signup' >Signup now</Link></h6>
    </div>
 
    </div>
    </div>
   
   <ToastContainer/>
         </>
      }
    
    </div>
  )
}

export default Login