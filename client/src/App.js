import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Upload from "./components/pages/Upload";
import Projects from "./components/pages/Projects";
import Reset from "./components/pages/Reset";

import Payresult from "./components/pages/Payresult";
import Cashfree from "./components/pages/Cashfree";
import Newpassword from "./components/pages/Newpassword";
import GoogleAuth from "./components/pages/GoogleAuth";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import HowItWorks from "./components/pages/HowItWorks";
import ContactUs from "./components/pages/ContactUs";
import HelpnSupport from "./components/pages/Help&support";
import Oneproject from "./components/pages/Oneproject";
import TermsandConditions from "./components/pages/TermsandConditions";
import { reducer, initialState } from "../src/reducers/useReducer";
import { useEffect, createContext, useReducer ,useContext} from "react";
import Error404 from "./components/pages/Error404";
import OrderPage from "./components/pages/OrderPage";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
  
    if(user){
      dispatch({type:"USER",payload:user})
     
    }
    console.log(state)
  },[])
  return (
    
    <>

 <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/help&support" element={<HelpnSupport />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/upload" element={state?<Upload />:<Login/>} />
          <Route path="/googleauth" element={<GoogleAuth/>} />
          <Route path="/allprojects" element={<Projects/>}/>
          <Route path="/project/:userid" element={<Oneproject/>}/>
          <Route path="/reset-password" element={<Reset/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/cashfree" element={<Cashfree/>}/>
          <Route path="/cashfree/:orderid" element={<Payresult/>}/>
          <Route path="/newpassword/:id/:token" element={<Newpassword/>}/>
          <Route path="/term-and-conditions" element={<TermsandConditions/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>}/>
          <Route path="/payment" element={<OrderPage/>}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
    </>
       
  
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}} >
      <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID}} >
      <BrowserRouter>
        <Routing />
       
      
      </BrowserRouter>
      </PayPalScriptProvider>
    </UserContext.Provider>
  );
}

export default App;
