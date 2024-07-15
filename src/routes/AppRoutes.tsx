import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import HomePage from '@/pages/HomePage'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>


            </Route>

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes