import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


export const Home = ({setUser}) => {


    const logout = () => {

      axios.delete('http://localhost:5000/username-password/logout', { withCredentials: true })
          .then( res => { if (res.data === 'session destroyed') { 
                                setUser(false) 
                            } 
                            alert(res.data) 
                        }) 
    }

    return(<div>Home
        <button onClick={logout }> Logout </button>
        <Link to="/profile"> Profile </Link>
    </div>)
}