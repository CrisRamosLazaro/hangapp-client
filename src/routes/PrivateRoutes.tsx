import { useContext } from "react"
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import Loader from "@/components/Loader"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default PrivateRoute