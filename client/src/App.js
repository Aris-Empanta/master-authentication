import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PrivateRoutes } from "./components/privateRoutes"
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Signup } from './components/signup';
import axios from 'axios'


const App = () =>  {

  const [ loggedIn, setLoggedIn ] = useState(false)

  useEffect(() => {
    
    
    setLoggedIn( JSON.parse(localStorage.getItem('loggedIn')))
  }, [])
  
  useEffect(() => {

    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    console.log(loggedIn)
  }, [loggedIn])
  

  return (
          <Routes >
            <Route path='/login' element={loggedIn ? <Navigate to="/" replace={true} /> : <Login setLoggedIn = { setLoggedIn } />} />
            <Route path='/signup' element={loggedIn ? <Navigate to="/" replace={true} /> : <Signup/>} />
            <Route path="/" element={<PrivateRoutes loggedIn = { loggedIn } />}>
              <Route path="/" element={<Home setLoggedIn = { setLoggedIn }  />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        );
}

export default App;
