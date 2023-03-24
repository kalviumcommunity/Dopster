import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import HashLoader from "react-spinners/HashLoader";
import Footer from "./Footer";
import downsvg from "../assets/Downside.svg"
import "../css/oneproject.css";
const Oneproject = () => {
  const { userid } = useParams();
  const [data, setData] = useState([]);
const [likedby,setLikedby] = useState([])
const [project,setProject] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + `/projects/project/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setTimeout(() => {}, 1000);
      });

      
  }, [userid]);

  const getmoreprojects = ()=>{

  
    fetch("http://localhost:7000/projects/userprojects",{
      method:"Post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        id:data.postedBy?._id
      })
    })
    .then(data=>{
      data.json()
    })
    .then(project=>{
      console.log(project)
      setProject(project)
    })
  
  }
  //Function to post the like to backend

  const sendLikes = async () => {
    const likedata = await fetch(
      "http://localhost:7000/projects/like-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: data.likes,
        }),
      }
    );
    const result = await likedata.json();
    console.log(result)
    setLikedby(result)

  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={loading ? "loader" : "main-div"}>
        {loading ? (
          <HashLoader color="#36db" />
        ) : (
          <>
            <div id="details-div">
              <img
                id="project-image"
                src={data.photo}
                alt=""
                style={{ width: "50%" }}
              />
              <div id="details-typo">
                <h3 id="project-name">Project Name: {data.title}</h3>
                <h3> Description</h3>
                <p>{data.body}</p>

                <a
                  id="live-demo-button"
                  rel="noreferrer"
                  href={data.link}
                  target="_blank"
                >
                  Live Demo
                </a>
                <h3 onClick={()=>{sendLikes()}}>{data?.likes?.length} Likes</h3>
                {likedby?.userdetails}
              </div>
            </div>
           
          </>
        )}
       
       
      </div>
      <div  style={{width:"100%",margin:"2vh auto",textAlign:"center"}} >  <h2  >Wanna see more projects by {data.postedBy?.name}?</h2></div>
      <div style={{width:"100%",display:"flex",justifyContent:"center",margin:"1vh auto"}} onClick={()=>{getmoreprojects()}}><img src={downsvg} alt="" /></div>
      <Footer />
    </>
  );
};

export default Oneproject;
