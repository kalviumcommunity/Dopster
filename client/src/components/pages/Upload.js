import React, { useState,useEffect } from "react";
import ResponsiveAppBar from "./Navbar";
import HashLoader from 'react-spinners/HashLoader'
import { ToastContainer, toast } from "react-toastify";
import Background from "../assets/Group34.png";
import "../css/upload.css";
const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },3000)
  },[])
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Dopster");
    data.append("cloud_name", "dfl44vyoj");

    fetch("https://api.cloudinary.com/v1_1/dfl44vyoj/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setUrl(data.url);
      })
      .then(() => fetch("http://localhost:7000/projects/createproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title: title,
            description: description,
            link: link,
            photo: url,
          }),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="upload-main"  className={loading?"loader":''}>
      {
        loading?<HashLoader color="#36db" />:<>
        <ResponsiveAppBar />
      <div id="upload-flex" style={{ backgroundImage: `url(${Background})` }}>
        <div id="form-background">
          <h2>Upload Your Project</h2>
          <input
            type="text"
            placeholder="Title"
            className="upload-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            cols="40"
            rows="5"
            type="text"
            placeholder="Description"
            className="upload-input description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="upload-input"
            placeholder="Live demo link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="file"
            id="input-image"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button id="upload-button" onClick={() => postDetails()}>
            Upload
          </button>
        </div>
      </div>
      <ToastContainer />
      </>
      }
    
    </div>
  );
};

export default Upload;