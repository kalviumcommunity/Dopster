import {useState,useContext} from 'react';
import logo from '../assets/bluelogo.svg'
import '../css/navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
import { UserContext } from '../../App';
function ResponsiveAppBar() {
  const {state,dispatch} = useContext(UserContext)
  const renderMobileList = ()=>{
    if(state){
      return [
        <RiCloseFill onClick={()=>navfunc()} />,
        <h5>About</h5>,
        <h5>Contact</h5>,
        <h5 onClick={()=>navigate("/myprofile")} >My Profile</h5>,
        <h5 onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate('/')
         }} >Log out</h5>
       
      ]
    }
    else{
      return [
        <RiCloseFill onClick={()=>navfunc()} />,
        <h5>About</h5>,
        <h5>Contact</h5>,
        <h5 onClick={()=>navigate("/signup")} >Signup</h5>,
        <h5 onClick={()=>navigate("/login")}>Sign in</h5>

      ]
    }
  }
  const renderList = ()=>{
    if(state){
      return [
        <div id='nav-right' >
      <div className="menu">
        <div id='ul' >
        <Link to='/about'> <h5 className='nav-items'>About  </h5></Link>
        <Link to='/contact' >   <h5  className='nav-items'>Contact</h5></Link>
        <Link to='/myprofile' >   <h5  className='nav-items'>My Profile</h5></Link>
        </div>
      </div>
      <div id='signup__div-nav' >
     <button  id='signup__button_nav' onClick={()=>{
      localStorage.clear()
      dispatch({type:"CLEAR"})
      navigate('/')
     }}>Log out</button>
      </div>
    </div>
        
      ]
    }
    else{
      return [
        <div id='nav-right' >
      <div className="menu">
        <div id='ul' >
        <Link to='/about'> <h5 className='nav-items'>About  </h5></Link>
        <Link to='/contact' >   <h5  className='nav-items'>Contact</h5></Link>

        <Link to='/login' >   <h5  className='nav-items'>Sign in</h5></Link>
        </div>
      </div>
      <div id='signup__div-nav' >
     <button onClick={()=>navigate("/signup")} id='signup__button_nav'>  Signup</button>
      </div>
     
      </div>
      ]
    }
  }
const navigate=useNavigate()
const [showMediaBar,setShowMediaBar] = useState(true)
const navfunc = ()=>{
  setShowMediaBar(!showMediaBar)
 
  const mobilemenu = document.getElementById("mobile-menu")  

  if(showMediaBar){
    mobilemenu.classList.remove("nav-up")
    mobilemenu.classList.add("nav-down")
  
  }
  else if(!showMediaBar){
    mobilemenu.classList.remove("nav-down")
    mobilemenu.classList.add("nav-up")
  
  }

}

  return (
    <>
    <nav className='main__nav'>
      <div> <Link to='/' ><img  className="nav-logo" src={logo} alt="" /></Link> 
      </div>
      {/* <div id='nav-right' >
      <div className="menu">
        <div id='ul' >
        <Link to='/about'> <h5 className='nav-items'>About  </h5></Link>
        <Link to='/contact' >   <h5  className='nav-items'>Contact</h5></Link>

        <Link to='/login' >   <h5  className='nav-items'>Sign in</h5></Link>
        </div>
      </div>
      <div id='signup__div-nav' >
     <button onClick={()=>navigate("/signup")} id='signup__button_nav'>  Signup</button>
      </div>
     
      </div> */}
      {renderList()}
      <div className="hamburger-menu">
      <a id='hamburger' href="#" onClick={()=>navfunc()} ><GiHamburgerMenu/></a>
      </div>
      <div id='mobile-menu' >
       {
        renderMobileList()
       }
      </div>
  

    </nav>
    
    </>

  );
}
export default ResponsiveAppBar;