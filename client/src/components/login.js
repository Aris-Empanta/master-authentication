import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'

export const Login = ({setUser}) => {

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
        .then( res => res.data === 'Successfully authenticated' ? setUser(true) : setUser(false))
  
  }   


    return(<div className="loginComponent">
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <button onClick={ loginUser }>login</button>
           </div>)
}