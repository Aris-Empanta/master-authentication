import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

export const Login = ({setUser, setTrainer}) => {

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  
  const loginUser = () => { 

    axios.post('http://localhost:5000/username-password/login', {
                                                username: username,
                                                password: password
                                              }, 
                                              { 
                                                withCredentials: true 
                                              })
        .then( res => { 
          console.log(res.data)
                        res.data.id ? setUser(true) : setUser(false)
                        res.data.name? setTrainer(res.data.name) : setTrainer(null)
                        } )
  
  }   

  const googleLogin = () => {

    window.open('http://localhost:5000/auth/google', '_self')
  }


    return(<div className="loginComponent">
            <div id="googleLogin">
              <button onClick={ googleLogin }>Google</button>
            </div>
            <div id="usernamePasswordLogin">
              <h1>Login</h1>
              <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
              <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
              <button onClick={ loginUser }>login</button>
              <Link to='/signup'>Register</Link>
              <Link to='/restore-password'>Forgot your password</Link>
            </div>
           </div>)
}