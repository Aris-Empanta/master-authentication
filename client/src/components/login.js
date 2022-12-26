import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'

export const Login = ({setLoggedIn}) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")


    const sendCredentials = () => {

      
      axios.post('http://localhost:5000/login', {
                                                  username: username,
                                                  password: password
                                                }, { withCredentials: true })
          .then( res => res.data.user ? setLoggedIn(true) : setLoggedIn(false) )
                       }
    const check = () => {
        axios.get('http://localhost:5000/check', { withCredentials: true })
             .then( res => console.log(res.data)) 
    }

    const logout = () => {

      axios.delete('http://localhost:5000/logout', { withCredentials: true })
           .then( res => console.log(res.data)) 
    }

    return(<div className="loginComponent">
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={ (e) => setUsername(e.target.value) }/>
            <input type="password" placeholder="password"  onChange={ (e) => setPassword(e.target.value) }/>
            <button onClick={ sendCredentials }>login</button>
            <button onClick={ check }>check</button>
            <button onClick={ logout }>logout</button>
           </div>)
}