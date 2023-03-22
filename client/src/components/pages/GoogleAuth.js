import { useEffect, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const { state, dispatch } = useContext(UserContext);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  async function handleCallbackResponse(response) {
    
    setLoading(true)
    
    const fetchdata = await fetch(process.env.REACT_APP_API+"/auth/googleauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    });
    const jsondata = await fetchdata.json();
    localStorage.setItem("jwt", jsondata.jwtoken);
    localStorage.setItem("user", JSON.stringify(jsondata.user));
    dispatch({ type: "USER", payload: jsondata.user });
    setLoading(false)
 
    navigate("/");
  }

  useEffect(() => {
    /* global google */
   google.accounts.id.initialize({
      client_id:
        process.env.REACT_APP_CLIENTID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signindiv"),
       {
      theme: "outline",
      size: "large",
    }
    );
  },[]);

  
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}
    > <h4>{loading===true?"Signing you in...":""}</h4>
      <div id="signindiv"></div>
    </div>
  );
};

export default GoogleAuth;