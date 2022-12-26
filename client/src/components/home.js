import { useEffect, useState } from 'react';
import axios from 'axios'


export const Home = ({setLoggedIn}) => {

    const logout = () => {

      axios.delete('http://localhost:5000/logout', { withCredentials: true })
          .then( res => res.data === 'session destroyed' ? setLoggedIn(false) : 
                                                           setLoggedIn(true) ) 
    }

    return(<div>Home
        <button onClick={logout }> Logout </button>
    </div>)
}