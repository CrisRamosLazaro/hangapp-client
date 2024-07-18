import { useContext, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import logo from '@/assets/logo.png'


const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const [openNav, setOpenNav] = useState(false)

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const navList = () => {
        return (
            <>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-blue-200" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/spots"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-blue-200" : ""
                    }
                >
                    Spots
                </NavLink>
                <NavLink
                    to="/everyone"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-blue-200" : ""
                    }
                >
                    Everyone
                </NavLink>
                {
                    user &&
                    <NavLink to="/places/create">Create places</NavLink>
                }
                {
                    user &&
                    <NavLink to="/groups/">Groups</NavLink>
                }
                {
                    user &&
                    <NavLink to="/groups/match"> Connect Groups </NavLink>
                }
            </>
        )
    }

    return (

        <header className="bg-yellow-600 text-white p-4">
            <div className="container mx-auto py-2 px-4 md:flex md:items-center md:justify-between">

                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl font-semibold">HangApp
                        <img className='w-20' src={logo} alt="" />
                    </Link>
                    <button
                        onClick={toggleNav}
                        className="text-xl md:hidden border border-white p-2 rounded">
                        <svg
                            className={`w-6 h-6 ${openNav ? 'hidden' : 'block'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                        <svg
                            className={`w-6 h-6 ${openNav ? 'block' : 'hidden'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
                <nav className="hidden md:flex space-x-4">
                    {navList()}
                </nav>
                <div
                    className={`${openNav ? '' : 'hidden'
                        } mt-4  bg-yellow-800 flex flex-col gap-4 p-6  rounded `}
                >
                    {navList()}
                </div>

                {
                    user
                        ?
                        <nav>
                            <div>
                                <Link to={`/profile/${user.id}`}>My Profile</Link>
                            </div>
                            <hr />
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent border-none p-0 cursor-pointer">
                                    Logout
                                </button>
                            </div>

                        </nav>
                        :
                        <nav>
                            <Link to="/signup">Sign up</Link>
                            <hr />
                            <Link to="/login">Login</Link>
                        </nav>
                }

            </div>
        </header >

    )
}

export default Navigation