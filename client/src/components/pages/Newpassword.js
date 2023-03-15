import React, { useState, useContext, useEffect } from "react";

import logo from "../assets/logo.svg";
import authsvg from "../assets/loginsvg.svg";

import "../css/login.css";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from "react-router-dom";

//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
const Newpassword = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const {id,token} = useParams()
  
  const Postdata = async () => {
    
    // setIsLoading(true);
    if(password!==confirmPassword){
        toast.error("Both password should match")
        setIsLoading(false)
        return
    }
    fetch(process.env.REACT_APP_API+`/new-password/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        if (data.error) {
          toast.error(data.error);
          
          setPassword("");
        } else {
          toast.success(data.message)
        //   setTimeout(() => {
        //     navigate("/login");
        //   }, 1000);

        }
      });
  };
  return (
    <div>
      <>
        <div id="logo__svg_div">
          <img src={logo} alt="" />
        </div>
        <div className="display__flex">
          <div id="signup__svg_div">
            <img src={authsvg} alt="" id="signup__svg" />
          </div>
          <div id="signup__form">
            <div id="form">
              <h2 id="welcome__back">Reset Password</h2>

              <div className="form__details">
                <h4>Password</h4>
                <input
                  className="input"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__details">
                <h4>Confirm Password</h4>
                <input
                  type="password"
                  className="input"
                  placeholder="Re-enter your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {isLoading === true ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <button
                  type="submit"
                  id="signup__button"
                  onClick={() => Postdata()}
                >
                  Reset
                </button>
              )}

              <div id="hr__div">
               
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </>
    </div>
  );
};

export default Newpassword;
