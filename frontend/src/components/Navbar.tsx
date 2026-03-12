import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
 
    const closeMenu = () => setIsOpen(false);
 
    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/');
    };
 
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
 
    // CLOSE MOBILE MENU ON ROUTE CHANGE
    useEffect(() => {
        closeMenu();
    }, [navigate]);
 
    return (
        <nav
            className={`
                sticky top-0 z-50 text-white
                transition-all duration-500 ease-in-out
                mt-4 ml-15 mr-15 rounded-2xl
                ${scrolled
                    ? 'to-secondary-navy-blue/70 hidden'
                    : ' bg-gradient-to-r from-secondary-navy-blue to-secondary-navy-blue/80 backdrop-blur-md'
                }
            `}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
                <div className="flex items-center justify-between h-20">
 
                    {/* LOGO */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            className="max-w-40 transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
 
                    {/* DESKTOP LINKS */}
                    <div className="hidden sm:flex items-center space-x-8">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/team">Our Team</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
 
                    {/* DESKTOP AUTH */}
                    <div className="hidden sm:flex items-center space-x-5">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={`/profile/${user?.user_id}`}
                                    className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200"
                                >
                                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold uppercase border border-white/20">
                                        {user?.username?.[0]}
                                    </span>
                                    {user?.username}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-semibold text-white/50 hover:text-white/90 transition-colors duration-200 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-semibold px-4 py-2 rounded-md bg-white text-secondary-navy-blue hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
 
                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="sm:hidden p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {isOpen
                            ? <HiX className="text-2xl" />
                            : <HiMenu className="text-2xl" />
                        }
                    </button>
                </div>
            </div>
 
            {/* MOBILE MENU */}
            <div
                className={`
                    sm:hidden border-t border-white/10 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-6 py-5 space-y-1 bg-secondary-navy-blue/95 backdrop-blur-md">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/about', label: 'About Us' },
                        { to: '/team', label: 'Our Team' },
                        { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={closeMenu}
                            className="block py-2.5 px-3 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 rounded-md transition-all duration-150"
                        >
                            {label}
                        </Link>
                    ))}
 
                    <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={`/profile/${user?.user_id}`}
                                    onClick={closeMenu}
                                    className="flex items-center gap-2.5 py-2.5 px-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/8 rounded-md transition-all duration-150"
                                >
                                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold uppercase">
                                        {user?.username?.[0]}
                                    </span>
                                    {user?.username}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2.5 px-3 text-sm font-semibold text-white/50 hover:text-white/80 hover:bg-white/8 rounded-md transition-all duration-150"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block py-2.5 px-3 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 rounded-md transition-all duration-150"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={closeMenu}
                                    className="block py-2.5 px-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-md transition-all duration-150 mt-1"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
 
export default Navbar;
