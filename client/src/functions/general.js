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