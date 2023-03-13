import { useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "382413014720-hc9v4e6gnh52giikp9u6f0qa79qj0f11.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signindiv"), {
      theme: "outline",
      size: "xx-large",
    });
  });

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + (await response.credential));
    const userdetail = await jwt_decode(response.credential);
    console.log(userdetail);
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
    console.log(jsondata);
    localStorage.setItem("jwt", jsondata.jwtoken);
    localStorage.setItem("user", JSON.stringify(jsondata.user));
    dispatch({ type: "USER", payload: jsondata.user });

    navigate("/");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="signindiv"></div>
    </div>
  );
};

export default GoogleAuth;