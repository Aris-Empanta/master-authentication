import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Login = ({authenticate}) => {

  const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

  const navigate = useNavigate()
  
  const onClick = () => {

   // navigate('/')
    //authenticate()
    axios.post('http://localhost:5000/login', {
                                                username: username,
                                                password: password
                                              }, 
                                              { 
                                                withCredentials: true 
                                              })
        .then( res => alert(res.data))
  
  }   


    return(<div className="loginComponent">
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <button onClick={ onClick }>login</button>
           </div>)
}