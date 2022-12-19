import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { PrivateRoutes } from "./components/privateRoutes"
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Signup } from './components/signup';


const App = () =>  {

  const [ loggedIn, setLoggedIn ] = useState(false)
  

  return (
          <Routes >
            <Route path='/login' element={loggedIn ? <Navigate to="/" replace={true} /> : <Login />} />
            <Route path='/signup' element={loggedIn ? <Navigate to="/" replace={true} /> : <Signup/>} />
            <Route path="/" element={<PrivateRoutes loggedIn = { loggedIn } />}>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        );
}

export default App;
