import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'

export const Login = () => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const sendCredentials = () => {

          axios.post('http://localhost:5000/login', {
                                                      username: username,
                                                      password: password
                                                    })
      }

    return(<div className="loginComponent">
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <button onClick={ sendCredentials }>login</button>
           </div>)
}