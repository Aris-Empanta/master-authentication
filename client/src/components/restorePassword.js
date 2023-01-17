import { useEffect, useState } from "react"
import { sendVerificationCode, setNewPassword } from "../functions/restorePassword"
import axios from 'axios'
import '../css/restorePassword.css'
import { Link, useNavigate } from "react-router-dom"

export const RestorePassword = ({setHaveCode}) => {

    const [ password, setPassword ] = useState("")
    const [ verificationCode, setVerificationCode ] = useState('')
    const [ userVerified, setUserVerified ] = useState(false)
    const [ confirmedPassword, setConfirmedPassword ] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        return () => {
            //When component unmounts, we set below state to false, to erase
            //the stored email from the local storage ( see parent App component )
            setHaveCode(false)
        }
    }, [])

    const email = localStorage.getItem('email')

    return(<div id="restorePasswordComponent">
             <input type='text' placeholder="code"  onChange={ (e) => setVerificationCode(e.target.value) } />
             <button onClick={ () => sendVerificationCode( axios, verificationCode, 
                                                           email, setUserVerified) } >
                submit code
             </button>
             <div id="restorePassword">
                <input type="password" placeholder="password"  
                        onChange={ (e) => setPassword(e.target.value) }/>
                <input type="password" placeholder="confirm password"  onChange={ (e) => setConfirmedPassword(e.target.value) }/>
             </div>
             <button onClick={ () => setNewPassword( axios, userVerified, 
                                                     email, password,  
                                                     confirmedPassword, navigate ) }>
                    Save new password
             </button>
             <Link to="/login">Back to login</Link>
           </div>)
}