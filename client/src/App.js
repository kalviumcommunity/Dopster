import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Upload from "./components/pages/Upload";
import Projects from "./components/pages/Projects";
import HelpnSupport from "./components/pages/Help&support";
import Oneproject from "./components/pages/Oneproject";
import { reducer, initialState } from "../src/reducers/useReducer";
import { useEffect, createContext, useReducer ,useContext} from "react";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
  
    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }
  },[])
  return (
    
    <>
 <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/help&support" element={<HelpnSupport />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />

          <Route path="/allprojects" element={<Projects/>}/>
          <Route path="project/:userid" element={<Oneproject/>}/>

        </Routes>
    </>
       
  
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}} >
      <BrowserRouter>
        <Routing />
       
      
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
