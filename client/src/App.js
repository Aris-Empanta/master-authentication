import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PrivateRoutes } from "./components/privateRoutes"
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Signup } from './components/signup';


const App = () =>  {

  const [ user, setUser ] = useState(null)

  useEffect(() => {
    
    const u = localStorage.getItem('user')

    u && JSON.parse(u) ? setUser(true) : setUser(false)

  }, [])
  
  useEffect(() => {

    localStorage.setItem('user', user)
  }, [user])
  

  return (
          <Routes >
            { !user ? (
              <>
                <Route path='/login' element={<Login authenticate = { () => setUser(true)} />} />
                <Route path='/signup' element={<Signup/>} /> 
              </>)
              : (           
              <> 
                <Route path="/" element={ <Home logout = { () => setUser(false) }  /> } />
                <Route path="/profile" element={<Profile  />} />
              </>  
            )}
            <Route path='*' element={ <Navigate to={ user ? '/' : "/login"} />} />
          </Routes>
        );
}

export default App;
