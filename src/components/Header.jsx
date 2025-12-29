import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/login");
        setIsMenuOpen(false);
    };

    const handleDashboardClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast.error("Login first to access dashboard");
            navigate("/login");
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="p-4 bg-black text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="font-bold text-xl">
                    Event Listing System
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-gray-300 transition duration-200">
                        Home
                    </Link>
                    <Link to="/events" className="hover:text-gray-300 transition duration-200">
                        Events
                    </Link>
                    
                    {/* Dashboard */}
                    <Link 
                        to="/dashboard" 
                        onClick={handleDashboardClick}
                        className="hover:text-gray-300 transition duration-200"
                    >
                        Dashboard
                    </Link>

                    {/* Auth toggle */}
                    {!user ? (
                        <Link 
                            to="/login" 
                            className="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded transition duration-200"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-200"
                        >
                            Logout
                        </button>
                    )}
                </nav>

                {/* Mobile Hamburger Button */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {/* Font Awesome Hamburger Icon */}
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <div className="flex flex-col space-y-4 pt-4 pb-6 border-t border-gray-700">
                    <Link 
                        to="/" 
                        onClick={closeMenu}
                        className="hover:text-gray-300 py-2 transition duration-200"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/events" 
                        onClick={closeMenu}
                        className="hover:text-gray-300 py-2 transition duration-200"
                    >
                        Events
                    </Link>
                    
                    {/* Dashboard (guarded click) */}
                    <Link 
                        to="/dashboard" 
                        onClick={(e) => {
                            handleDashboardClick(e);
                            if (user) closeMenu();
                        }}
                        className="hover:text-gray-300 py-2 transition duration-200"
                    >
                        Dashboard
                    </Link>

                    {/* Auth toggle */}
                    {!user ? (
                        <Link 
                            to="/login" 
                            onClick={closeMenu}
                            className="bg-white hover:bg-gray-300 px-4 py-3 rounded text-black text-center transition duration-200"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded text-center transition duration-200"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}