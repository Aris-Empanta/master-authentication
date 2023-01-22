import axios from 'axios'
import { Link } from "react-router-dom";
import { logout } from '../functions/logout';


export const Home = ({setUser}) => {

    return(<div>
             <button onClick={ () => logout( axios, setUser ) }> Logout </button>
             <Link to="/profile"> Profile </Link>
           </div>)
}