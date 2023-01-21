//With this function, we can check if there is a user with a session
//on a specific client
export const checkIfUser = async (axios, setUser ) => {

                const response = await axios.get('http://localhost:5000/check-for-user', 
                                                { 
                                                    withCredentials: true 
                                                })

                console.log(response.data)
                //If there is a user's id, we stay logged in, else we logout.
                response.data.id ? setUser(true) : setUser(false)
            }