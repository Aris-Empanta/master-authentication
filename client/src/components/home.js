import axios from 'axios'
import { Link } from "react-router-dom";


export const Home = ({setUser}) => {

    const logout = () => {

      axios.delete('http://localhost:5000/logout/', { withCredentials: true })
          .then( res => { if (res.data === 'session destroyed') { 
                                setUser(null) 
                            } 
                            alert(res.data) 
                        }) 
    }

    return(<div>
             <button onClick={logout }> Logout </button>
             <Link to="/profile"> Profile </Link>
           </div>)
}