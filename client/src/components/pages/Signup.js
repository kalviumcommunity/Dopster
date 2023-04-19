import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import authsvg from "../assets/loginsvg.svg";

import "../css/signup.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();

  const Postdata = async () => {
    setIsLoading(true);
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.warning("invalid email");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Both password and incorrect password should match");
      setIsLoading(false);
      return;
    }
    fetch(process.env.REACT_APP_API + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        // console.log(data)
        if (data.error) {
          toast.error(data.error);
        } else {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setName("");
          toast.success(data.message);

          setTimeout(() => {
            window.confirm("redirecting you to login page");
            navigate("/login");
          }, 1500);
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
                <h2 id="create__account">Create an account</h2>

                <div className="form__details">
                  <h4>Name</h4>
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form__details">
                  <h4>Email</h4>
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__details">
                  <h4>Password</h4>
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__details">
                  <h4>Confirm Password</h4>
                  <input
                    className="input"
                    type="password"
                    placeholder="Confirm Password"
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
                    onClick={() => Postdata()}
                    id="signup__button"
                  >
                    Sign up
                  </button>
                )}

                <div id="hr__div">
                  <hr />
                  <p>or</p>

                  <hr />
                </div>

                {/* <button id='google__signin' onClick={()=>{
        navigate('/googleauth')
      }} ><img id='google' src={google} alt="" />Continue with Google</button> */}
                <div
                  id="signindiv"
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <GoogleAuth />
                </div>
                <h6 id="linkto__login">
                  Already have an account? <Link to="/login">Login now</Link>
                </h6>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Signup;
