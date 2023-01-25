import { serverHost } from "../variables/serverHost"

//With this function, we can check if there is a user with a session
//on a specific client
export const checkIfUser = async (axios, setUser ) => {

        const response = await axios.get( serverHost + 'check-for-user', 
                                            { 
                                            withCredentials: true 
                                            }
                                        )

        //If there is a user's id, we stay logged in, else we logout.
        response.data.id ? setUser(true) : setUser(false)
    }

//This function makes pokemon id numbers at least 3 digits long with hash (#) in front
export const formatId = (id) => {

    if( id < 10 ) return '#00' + id

    if( id < 100 ) return '#0' + id

    return '#' + id
}

//Makes the first letter capital
export const firstLetterCapital = (word) => {

    let wordArray = word.split('')

    wordArray[0] = wordArray[0].toUpperCase()

    return wordArray.join('')
}