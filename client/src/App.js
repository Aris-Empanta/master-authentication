import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Signup } from './components/signup';
import axios from 'axios'


const App = () =>  {

  const [ user, setUser ] = useState(null)

  useEffect( () => {
    
    const loggedInUser = localStorage.getItem('user')

    loggedInUser && JSON.parse(loggedInUser) ? setUser(true) : setUser(false)

    const checkIfUser = async () => {

        const response = await axios.get('http://localhost:5000/get-user', 
        { 
          withCredentials: true 
        })

        console.log(response)
      }
      checkIfUser()
  }, [])
  
  useEffect(() => {

    localStorage.setItem('user', user)
  }, [user])
  

  return (
          <Routes >
            { !user ? (
              <>
                <Route path='/login' element={<Login setUser = { setUser } />} />
                <Route path='/signup' element={<Signup/>} /> 
              </>)
              : (           
              <> 
                <Route path="/" element={ <Home setUser = { setUser }  /> } />
                <Route path="/profile" element={<Profile  />} />
              </>  
            )}
            <Route path='*' element={ <Navigate to={ user ? '/' : "/login"} />} />
          </Routes>
        );
}

export default App;
