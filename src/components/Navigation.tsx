import { useContext, useState } from 'react'
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import logo from '@/assets/logo-white.png'


const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const [openNav, setOpenNav] = useState(false)

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const navLinks = [
        { path: "/spots", label: "Spots" },
        { path: "/groups/", label: "Groups" },
        { path: "/groups/match", label: "Connect Groups" },
    ]

    const renderNavList = () => (
        <>
            {navLinks.map(({ path, label }) => (
                user &&
                <NavLink
                    key={path}
                    to={path}
                    className={() => {
                        const isExactMatch = location.pathname === path
                        return isExactMatch
                            ? "block my-4 hover:underline text-gray-500"
                            : "block my-4 hover:underline"
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </>
    )

    return (

        <header className="bg-yellow-600 text-white p-2">

            <div className="container mx-auto py-2 px-4 lg:flex lg:items-center lg:justify-between">

                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center text-xl font-semibold">
                        <img className='w-10 h-10 mr-1' src={logo} alt="" />
                        HangApp
                    </Link>

                    {/* Hamburger button for mobile navigation */}
                    <button
                        onClick={toggleNav}
                        className="lg:hidden border border-white p-2 rounded text-xl"
                    >
                        {/* Hamburger icon */}
                        <svg
                            className={`w-6 h-6 ${openNav ? 'hidden' : 'block'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>

                        {/* X (close) icon */}
                        <svg
                            className={`w-6 h-6 ${openNav ? 'block' : 'hidden'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <nav className="hidden lg:flex space-x-4">
                    {renderNavList()}
                </nav>

                {!user ?

                    <nav className='hidden lg:flex justify-between space-x-4 mr-2'>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) => isActive
                                ? "hover:underline text-gray-500"
                                : "hover:underline"}
                        >
                            Sign up
                        </NavLink>

                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive
                                ? "hover:underline text-gray-500"
                                : "hover:underline"}
                        >
                            Login
                        </NavLink>
                    </nav>
                    :
                    <nav className='hidden lg:flex justify-between space-x-4 mr-2'>
                        <NavLink
                            to={`/profile/${user._id}`}
                            className={({ isActive }) => isActive
                                ? "hover:underline text-gray-500"
                                : "hover:underline"}
                        >
                            My Profile
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="bg-transparent border-none p-0 cursor-pointer">
                            Logout
                        </button>
                    </nav>

                }

                {/* Dropdown menu for mobile navigation */}
                <div
                    className={`${openNav ? '' : 'hidden'}
                         mt-4 bg-yellow-800 flex flex-col gap-4 p-4 md:w-1/2 md:ml-auto rounded`}
                >
                    {!user
                        ?
                        <nav>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) => isActive
                                    ? "block my-4 hover:underline text-gray-500"
                                    : "block my-4 hover:underline"}
                                onClick={toggleNav}
                            >
                                Sign up
                            </NavLink>

                            <NavLink
                                to="/login"
                                className={({ isActive }) => isActive
                                    ? "block my-4 hover:underline text-gray-500"
                                    : "block my-4 hover:underline"}
                                onClick={toggleNav}
                            >
                                Login
                            </NavLink>
                        </nav>
                        :
                        <nav>
                            {renderNavList()}

                            <div className="flex flex-col">
                                <NavLink to={`/profile/${user._id}`}>My Profile</NavLink>

                                <hr className='w-1/6 mx-auto' />

                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent border-none p-0 cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        </nav>
                    }
                </div>

            </div>
        </header >

    )
}

export default Navigation