import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import HomePage from '@/pages/HomePage'
import SignupPage from '@/pages/SignupPage'
import LoginPage from '@/pages/LoginPage'
import SpotsPage from '@/pages/SpotsPage'
import CreateSpotPage from '@/pages/CreateSpotPage'
import SpotFullInfoPage from '@/pages/SpotFullInfoPage'
import GroupsPage from '@/pages/GroupsPage'
import InsideGroupPage from '@/pages/InsideGroupPage'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/spots" element={<SpotsPage />} />
                <Route path="/spots/create-spot" element={<CreateSpotPage />} />
                <Route path="/spots/:spot_id" element={<SpotFullInfoPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/groups/:group_id" element={<InsideGroupPage />} />

            </Route>

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes