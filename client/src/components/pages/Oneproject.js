import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResponsiveAppBar from './Navbar'
import HashLoader from 'react-spinners/HashLoader'
import Footer from './Footer'
import '../css/oneproject.css'
const Oneproject = () => {
    const {userid} = useParams()
    const [data,setData]= useState([])

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
       
        fetch(`http://localhost:7000/projects/project/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result)
            setTimeout(()=>{
               
              },1000)
        })
    },[])
   
  return (
    <>
    <ResponsiveAppBar/>
    <div className={loading?"loader":'main-div'} >
    {
         loading? <HashLoader color="#36db" />:<>
    <div id='details-div' >
    <img id='project-image' src={data.photo} alt="" style={{width:"50%"}} />
    <div id='details-typo' >
    <h3>Project Name: {data.title}</h3>
      <p>{data.body}</p>
    
      <a id='live-demo-button' href={data.link} target='_blank' >Live Demo</a>
    </div>
   
    </div>
     
         </>
    }
    </div>
    <Footer/>
    </>
  )
}

export default Oneproject