import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { googleLogin, loginUser } from "../functions/login";

export const Login = ({setUser, setTrainer}) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    

    return(<div className="loginComponent">
            <div id="googleLogin">
              <button onClick={ googleLogin }>Google</button>
            </div>
            <div id="usernamePasswordLogin">
              <h1>Login</h1>
              <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
              <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
              <button onClick={ () => loginUser( axios, username, 
                                                 password, setUser, 
                                                 setTrainer ) }>
                login
              </button>
              <Link to='/signup'>Register</Link>
              <Link to='/restore-password'>Forgot your password</Link>
            </div>
           </div>)
}