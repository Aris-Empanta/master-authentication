import { useState } from "react"
import axios from 'axios'
import '../css/restorePassword.css'

export const RestorePassword = ({ setHaveCode }) => {

    const [ password, setPassword ] = useState("")
    const [ verificationCode, setVerificationCode ] = useState('')
    const [ userVerified, setUserVerified ] = useState(false)

    const sendVerificationCode = async () => {

        const email = localStorage.getItem('email')
        const restorePassword = document.getElementById('restorePassword')

        try {

            const response = await axios.post('http://localhost:5000/get-verification-code/compare-verification-code',
                                                { code: verificationCode, 
                                                  email: email 
                                                 })

            if(response.status !== 200) return alert(response.data)

            restorePassword.style.display = 'initial'
            setUserVerified(true)
        } catch (err) {

            alert(err.message)
        }
    }

    const setNewPassword = async () => {

        const email = localStorage.getItem('email')
              
        if(userVerified) {
           
           const response = await axios.put('http://localhost:5000/username-password/set-new-password', 
                                            {  
                                               email: email,
                                               newPassword: password 
                                            })
            alert(response.data)
        }
    }

   

    return(<div id="restorePasswordComponent">
             <input type='text' placeholder="code"  onChange={ (e) => setVerificationCode(e.target.value) } />
             <button onClick={ sendVerificationCode }>submit code</button>
             <input type="password" placeholder="password" id="restorePassword" 
                    onChange={ (e) => setPassword(e.target.value) }/>
             <button onClick={ setNewPassword }>Save new password</button>
           </div>)
}