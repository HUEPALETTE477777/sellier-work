import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-primary-black text-white sticky top-0 z-50 rounded-b-3xl shadow-secondary-navy-blue hover:shadow-2xl duration-150 cursor-pointer">
            <div className="flex px-6 py-4 justify-between items-center max-w-7xl mx-auto">

                {/* LOGO */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        className="h-20 w-20 sm:h-28 sm:w-28 object-contain"
                    />
                </Link>


                {/* DESKTOP LINKS */}
                <div className="hidden sm:flex space-x-10 text-lg font-medium">
                    <Link to="/" className="hover:text-secondary-gray transition">Home</Link>
                    <Link to="/about" className="hover:text-secondary-gray transition">About</Link>
                    <Link to="/contact" className="hover:text-secondary-gray transition">Contact</Link>
                </div>

                {/* DESKTOP AUTH */}
                <div className="hidden sm:flex space-x-6 text-lg items-center">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={`/profile/${user?.user_id}`}
                                className="hover:text-secondary-gray transition"
                            >
                                {user?.username}
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="hover:text-secondary-gray transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-secondary-gray transition">Login</Link>
                            <Link to="/signup" className="hover:text-secondary-gray transition">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button className="sm:hidden text-3xl" onClick={toggleMenu}>
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`sm:hidden transition-all duration-500 overflow-hidden 
          ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="px-6 pb-4 space-y-4 text-lg font-medium">
                    <Link to="/" className="block hover:text-secondary-gray">Home</Link>
                    <Link to="/about" className="block hover:text-secondary-gray">About</Link>
                    <Link to="/contact" className="block hover:text-secondary-gray">Contact</Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to={`/profile/${user?.user_id}`}
                                className="block hover:text-secondary-gray"
                            >
                                {user?.username}
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="block hover:text-secondary-gray"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-secondary-gray">Login</Link>
                            <Link to="/signup" className="block hover:text-secondary-gray">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
