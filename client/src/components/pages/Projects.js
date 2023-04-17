import React, { useState, useEffect, useContext } from "react";
import ResponsiveAppBar from "./Navbar";
import "../css/projects.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import HashLoader from "react-spinners/HashLoader";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Projects = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(5);
  const { state } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Function too fetch all projects

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    fetch(process.env.REACT_APP_API + "/projects/allprojects", {})
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result);
        setLoading(false);
      });
  }, []);
  const showMoreItems = () => {
    setVisible(visible + 6);
  };

  //Function to like any project

  const likePost = (id) => {
    fetch(process.env.REACT_APP_API + "/projects/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };

  //Function to dislike any project

  const dislikePost = (id) => {
    fetch(process.env.REACT_APP_API + "/projects/dislike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };
  //Function to post the like to backend

  const sendLikes = async (likes) => {
    const likedata = await fetch(
      "http://localhost:7000/projects/like-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes,
        }),
      }
    );
    const result = await likedata.json();
    console.log(result);
  };

  return (
    <>
      {" "}
      <ResponsiveAppBar />
      <div className={loading ? "loader" : ""}>
        {loading ? (
          <HashLoader color="#36db" />
        ) : (
          <>
            <div id="project-main-div">
              <div id="top-section">
                <div id="project-h2">
                  {" "}
                  <h2>Wanna upload your own project?</h2>
                </div>
                <div id="upload-button-div">
                  {" "}
                  <button id="project-upload">Upload Now</button>
                </div>
              </div>
              <hr className="hr" />
              <h1 style={{ textAlign: "center" }}>Projects</h1>
              <div id="all-cards">
                {data.slice(0, visible).map((item) => {
                  return (
                    <div className="card" style={{ cursor: "pointer" }}>
                      <img
                        onClick={() => navigate("/project/" + item._id)}
                        src={item.photo}
                        alt="project img"
                      />
                      <div className="card-body">
                        <h3>{item.title}</h3>
                        <div>
                          {state ? (
                            state._id ? (
                              item.likes.includes(state._id) ? (
                                <FaHeart
                                  id="like-button"
                                  size={25}
                                  onClick={() => dislikePost(item._id)}
                                />
                              ) : (
                                <FaRegHeart
                                  size={25}
                                  onClick={() => likePost(item._id)}
                                />
                              )
                            ) : (
                              <h6>Login to like</h6>
                            )
                          ) : (
                            "Login to like"
                          )}

                          <div
                            onClick={() => {
                              sendLikes(item.likes);
                            }}
                          >
                            {item.likes.length} likes
                          </div>
                        </div>

                        <hr className="hr" />
                        <p>By: {item.postedBy?.name}</p>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  id="show__more-div"
                >
                  {visible < data.length ? (
                    <button
                      id="show__more-button"
                      onClick={() => showMoreItems()}
                    >
                      Load More...
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Projects;
