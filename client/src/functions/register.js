//The function to register a user
export const submitCredentials = async (axios, username, email, password, confirmedPassword) => {

    //No empty spaces allowed
    if( username === '' || email === '' || 
        password === '' || confirmedPassword === '' ) return alert('Please fillup all the required fields')
    
    //Both passwords should be the same    
    if( password !== confirmedPassword ) return alert('Your passwords dont match!')

    //Password should be at least 7 characters long
    if(password.length < 7 ) return alert('Your password should be at least 7 characters long!')
    
    //If the 2 passwords match, we send the user's info to the server
    const userInfo = {
                       username: username,
                       email: email,
                       password: password
                     }
                     
    //Send credentials to the server 
    const response = await axios.post('http://localhost:5000/register', userInfo )

    alert(response.data)
}