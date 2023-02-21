import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
function App() {
  return (
  <BrowserRouter>

<Routes>
  <Route path='/' element={<Home/>} />

  <Route path='/login' element={<Login/>}/>

  <Route path='/signup' element={<Signup/>} />
 
  <Route path='/myprofile' element={<Profile/>}/>
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;