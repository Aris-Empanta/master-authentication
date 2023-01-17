import "../css/signup.css"
import { useState } from 'react';
import { submitCredentials } from "../functions/register";
import { Link } from "react-router-dom";
import axios from 'axios'

export const Register = () => {
  
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmedPassword, setConfirmedPassword ] = useState("")

    return(<div className="signupComponent">
            <h1>Signup</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type='email' placeholder="email" onChange={ (e) => setEmail(e.target.value) } />
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <input type="password" placeholder="confirm password"  onChange={ (e) => setConfirmedPassword(e.target.value) }/>
            <button onClick={ () => submitCredentials( axios, username,
                                                       email, password, 
                                                       confirmedPassword ) }>
                signup
            </button>
            <Link to="/login">Already a user? login</Link>
           </div>)
}