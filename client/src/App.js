import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { checkIfUser } from './functions/general'
import { ForgotPassword } from './components/forgotPassword'
import axios from 'axios'


const App = () =>  {

  const [ user, setUser ] = useState(null)
  const [ trainer, setTrainer ] = useState(null)

  useEffect( () => {

    //We parse the string value from the local storage we saved, 
    //and we set the user's state accordingly. 
    JSON.parse(localStorage.getItem('user')) ? setUser(true) : setUser(false)

    const trainer = localStorage.getItem('trainer')
    console.log(trainer)
    
    setTrainer(trainer) 

    //Every time the App renders, we check if a user's session exists, to determine
    //if we will stay logged in or not.
    checkIfUser(axios, setUser, setTrainer) 
  }, [])

  useEffect(() => {
    
    //Every time user and trainer state changes, we save the value to the local storage.
    localStorage.setItem('user', user)
    localStorage.setItem('trainer', trainer)
  }, [user, trainer])
  

  return (
          <Routes >
            { !user ? (
              <>
                <Route path='/login' element={<Login setUser = { setUser } setTrainer={ setTrainer }/>} />
                <Route path='/signup' element={<Signup/>} /> 
                <Route path='/restore-password' element={ <ForgotPassword /> } />
              </>)
              : (           
              <> 
                <Route path="/" element={ <Home setUser = { setUser } trainer={ trainer } setTrainer={setTrainer}  /> } />
                <Route path="/profile" element={<Profile  />} />
              </>  
            )}
            <Route path='*' element={ <Navigate to={ user ? '/' : "/login"} />} />
          </Routes>
        );
}

export default App;
