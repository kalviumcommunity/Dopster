import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import HashLoader from "react-spinners/HashLoader";
import Footer from "./Footer";
import downsvg from "../assets/Downside.svg";
import "../css/oneproject.css";
import { UserContext } from "../../App";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingSkeleton from "./LoadingSkeleton";
const Oneproject = () => {
  const { userid } = useParams();
  const [data, setData] = useState([]);
  const [likedby, setLikedby] = useState([]);
  const [totalprojects, setTotalProjects] = useState();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + `/projects/project/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.findProject);
        setTotalProjects(result.allprojects.length);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, [userid]);

  const getmoreprojects = async () => {
    const fetchdata = await fetch(
      process.env.REACT_APP_API + "/projects/userprojects",
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.postedBy?._id,
        }),
      }
    );
    const newdata = await fetchdata.json();
    console.log(newdata);
    setProject(newdata);
  };
  //Function to post the like to backend

  const sendLikes = async () => {
    const likedata = await fetch(
      process.env.REACT_APP_API + "/projects/like-details",
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
    console.log(result);
    setLikedby(result);
  };

  const makeComment = (text, postId) => {
    fetch(process.env.REACT_APP_API + "/projects/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={loading ? "loader" : "main-div"}>
        <>
          {}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div id="details-div">
              <img id="project-image" src={data.photo} alt="" />
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
                <h3
                  onClick={() => {
                    sendLikes();
                  }}
                >
                  {data?.likes?.length} Likes
                </h3>
                {likedby?.userdetails}
              </div>
            </div>
          )}
          <div
            id="comment-div"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <form
              className="comment-input"
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, data._id);
                e.target[0].value = "";
              }}
            >
              <input type="text" placeholder="add a comment" />
            </form>
            <div className="comments-container">
              {data?.comments?.map((record) => {
                return (
                  <h6 style={{ fontWeight: "500" }}>
                    <span style={{ fontWeight: "700" }}>
                      {record.postedBy.name}:&nbsp;
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
            </div>
          </div>
        </>
      </div>
      {totalprojects > 1 ? (
        <div>
          <div
            style={{ width: "100%", margin: "2vh auto", textAlign: "center" }}
          >
            {" "}
            <h2>Wanna see more projects by {data.postedBy?.name}?</h2>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "1vh auto",
            }}
            onClick={() => {
              getmoreprojects();
            }}
          >
            <a href="#footer__main">
              {" "}
              <img src={downsvg} alt="" />
            </a>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "10vh" }}></div>
      )}
      <div>
        <div id="all-cards">
          {project.map((item) => {
            return (
              <div className="card margin" style={{ cursor: "pointer" }}>
                <img
                  onClick={() => navigate("/project/" + item._id)}
                  src={item.photo}
                  alt="project img"
                />
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <div>
                    <div
                      onClick={() => {
                        sendLikes(item.likes);
                      }}
                    >
                      {item.likes.length} likes
                    </div>
                  </div>

                  <hr className="hr" />
                  <p>By: {item.postedBy.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Oneproject;
