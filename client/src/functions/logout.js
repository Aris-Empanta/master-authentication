import { serverHost } from "../variables/serverHost"

export const logout = (axios, setUser) => {

    axios.delete( serverHost + 'logout/', { withCredentials: true })
        .then( res => { if (res.data === 'session destroyed') { 
                              setUser(null) 
                          } 
                          alert(res.data) 
                      }) 
  }