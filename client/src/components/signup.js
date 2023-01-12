import "../css/signup.css"
import { useState } from 'react';
import axios from 'axios'

export const Signup = () => {
  
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const sendCredentials = () => {

      axios.post('http://localhost:5000/register', {
                                                      username: username,
                                                      email: email,
                                                      password: password
                                                    })
           }

    return(<div className="signupComponent">
            <h1>Signup</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type='email' placeholder="email" onChange={ (e) => setEmail(e.target.value) } />
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <button onClick={ sendCredentials }>signup</button>
           </div>)
}