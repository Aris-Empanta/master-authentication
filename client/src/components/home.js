import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


export const Home = ({logout}) => {

    const navigate = useNavigate()
/*
    const logout = () => {

      axios.delete('http://localhost:5000/logout', { withCredentials: true })
          .then( res => { if (res.data === 'session destroyed') { 
                              setLoggedIn(false) 
                              return navigate('/login', { replace: true })
                            } 
                            alert(res.data) 
                        }) 
    }*/

    return(<div>Home
        <button onClick={logout }> Logout </button>
        <Link to="/profile"> Profile </Link>
    </div>)
}