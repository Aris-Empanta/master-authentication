//The function to register a user
export const submitCredentials = async (axios, username, email, password, confirmedPassword) => {

    if( password !== confirmedPassword ) return alert('passwords dont match!')
    
    //If the 2 passwords match, we send the user's info to the server
    const userInfo = {
                       username: username,
                       email: email,
                       password: password
                     }

    const response = await axios.post('http://localhost:5000/register', userInfo )

    alert(response.data)
}