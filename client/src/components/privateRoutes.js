import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({ loggedIn }) => {

    return( loggedIn ? <Outlet/> : <Navigate to="/login" replace={true} />)
}