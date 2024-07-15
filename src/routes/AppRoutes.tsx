import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import HomePage from '@/pages/HomePage'
import SignupPage from '@/pages/SignupPage'
import LoginPage from '@/pages/LoginPage'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>


            </Route>

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes