import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className='bg-primary-navy-blue text-white'>
            <div className='flex px-4 py-4 justify-between items-center'>

                {/* LOGO */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={logo}
                        className="h-14 w-14 sm:h-24 sm:w-24 object-contain"
                    />
                </Link>

                {/* CENTER NAV ITEMS */}
                <div className="hidden sm:flex space-x-6 justify-center flex-1 text-2xl">
                    <Link to="/" className="hover:text-primary-gray transition">Home</Link>
                    <Link to="/about" className="hover:text-primary-gray transition">About</Link>
                    <Link to="/contact" className="hover:text-primary-gray transition">Contact</Link>
                </div>

                {/* MOBILE MENU, REQUIRED TO BE PLACED HERE */}
                <button
                    className="sm:hidden text-2xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? "CLOSE" : "OPEN"}
                </button>

                {/* DESKTOP NAV TEXT */}
                <div className="hidden sm:flex space-x-6 items-center">
                    {isAuthenticated ? (
                        <>
                            {user && (
                                <Link to={`profile/${user.user_id}`} className="text-xl">
                                    {user.username}
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="hover:text-primary-gray transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="text-2xl space-x-6">
                            <Link to="/login" className="hover:text-primary-gray transition">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-primary-gray transition">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>



            {/* MOBILE OPENED NAV */}
            <div
                className={`sm:hidden overflow-hidden transition-all duration-600 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 pt-2 space-y-2 font-medium">
                    <Link to="/" className=" block hover:text-primary-gray transition">Home</Link>
                    <Link to="/about" className="block hover:text-primary-gray transition">About</Link>
                    <Link to="/contact" className="block hover:text-primary-gray transition">Contact</Link>

                    {isAuthenticated ? (
                        <>
                            {user &&
                                <Link to={`profile/${user.user_id}`} className="text-sm">
                                    {user.username}
                                </Link>
                            }
                            <button onClick={logout} className="block hover:text-primary-gray transition cursor-pointer">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-primary-gray transition">Login</Link>
                            <Link to="/signup" className="block hover:text-primary-gray transition">Sign Up</Link>
                        </>
                    )}

                </div>
            </div>

        </nav>
    )
}

export default Navbar
