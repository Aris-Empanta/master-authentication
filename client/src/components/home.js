import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";


export const Home = ({setUser, trainer, setTrainer}) => {

    const logout = () => {

      axios.delete('http://localhost:5000/logout/', { withCredentials: true })
          .then( res => { if (res.data === 'session destroyed') { 
                                setUser(null) 
                                setTrainer(null)
                            } 
                            alert(res.data) 
                        }) 
    }

    return(<div>Hello { trainer }
        <button onClick={logout }> Logout </button>
        <Link to="/profile"> Profile </Link>
    </div>)
}