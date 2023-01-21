import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from "./components/home"
import { Profile } from './components/profile';
import { Login } from './components/login';
import { Register } from './components/register';
import { checkIfUser } from './functions/general'
import { ForgotPassword } from './components/forgotPassword'
import { RestorePassword } from './components/restorePassword';
import axios from 'axios'
import { LoadingComponent } from './components/loadingComponent';

//The App's parent component.
const App = () =>  {

  const [ user, setUser ] = useState("loading")
  const [ haveCode, setHaveCode ] = useState(false)

  useEffect( () => {

                //We show the user's loading screen               
                setUser('loading')

                //Every time the App renders, we check if a user's session exists, 
                //to determine if we will stay logged in or not.
                checkIfUser( axios, setUser ) 
              }, [])

  useEffect(() => {

                  //The email should stay on local storage only if we have verification code.
                  if( !haveCode )  localStorage.removeItem('email')
                }, [user, haveCode])  

  return (          
          <Routes >
            { user === 'loading' ? (
              <>
                <Route path='/' element={ <LoadingComponent/> } />
              </>
              )
              : !user ? (
              <>
                <Route path='/login' element={< Login setUser = { setUser } />} />
                <Route path='/signup' element={< Register />} /> 
                <Route path='/restore-password' 
                       element={ !haveCode ?                                                           
                                 <ForgotPassword setHaveCode = { setHaveCode }/>  :
                                 <RestorePassword setHaveCode = { setHaveCode }/> } />
              </>)
              : (           
              <> 
                <Route path="/" element={ <Home setUser = { setUser } /> } />
                <Route path="/profile" element={<Profile  />} />
              </>  
            )}
            <Route path='*' element={ <Navigate to={ user ? '/' : "/login"} />} />
          </Routes>
        );
}

export default App;
