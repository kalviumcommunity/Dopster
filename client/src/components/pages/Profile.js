import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from './Navbar'
import Footer from './Footer'
const Profile = () => {
const [userData,setUserData] = useState([])
  useEffect(()=>{
const fetchData = async ()=>{
    const data = await fetch('http://localhost:7000/profile',{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
    const user = await data.json()
    console.log(user)
    setUserData(user)
    // console.log(userData)
  }
  const myproject = async()  =>{
    const postdata = await fetch('http://localhost:7000/projects/myprojects',{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
    const post = await postdata.json()
    console.log(post)
  }
    fetchData()
    myproject()
  },[])
  
  
  return (
    <>
    <ResponsiveAppBar/>
    <div>
      <img src={userData.pic} alt="Profile" />
      <h2>{userData.name}</h2>
      <h3>{userData.email}</h3>
      <h3>DopeCredits: {userData.dopeCredits}</h3>
    </div>
    <div>
      <h2 style={{textAlign:'center'}} >Your Projects</h2>  
    </div>
    <Footer/>
    </>

  )
}

export default Profile
