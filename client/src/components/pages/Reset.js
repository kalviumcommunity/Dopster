import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import authsvg from "../assets/loginsvg.svg";

import "../css/login.css";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
//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
const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const Posteddata = async () => {
    setIsLoading(true);

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.warning("invalid email");
      setIsLoading(false);
      return;
    }

    fetch(process.env.REACT_APP_API+"/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false)
        if (data.error) {
          toast.error(data.error);
          setEmail("");
        } else {
          toast.success(data.message);
          
         
        }
      });
  };
  return (
    <div className={loading ? "loader" : ""}>
      {loading ? (
        <HashLoader color="#36db" />
      ) : (
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
                <h2 id="welcome__back">Reset your password</h2>

                <div className="form__details">
                  <h4>Email</h4>
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={() => Posteddata()}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Reset;