/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { User } from 'lucide-react';
import logo from "../../assets/techno_logo.png";
import SessionModal from '../SessionModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { exp } = jwtDecode(token);
        const expiryTime = exp * 1000;

        const interval = setInterval(() => {
            const now = Date.now();
            const secondsLeft = Math.floor((expiryTime - now) / 1000);
            setTimeLeft(secondsLeft);

            if (secondsLeft <= 10 && secondsLeft > 0) {
                setShowModal(true);
            }

            if (secondsLeft <= 0) {
                clearInterval(interval);
                localStorage.removeItem("token");
                navigate("/");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <>
            {showModal && <SessionModal secondsLeft={timeLeft} />}

            <nav className="relative bg-red-600 border-gray-200 dark:bg-red-600 dark:border-red-700">
                <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">

                    <a href="/dashboard" className="flex items-center space-x-3">
                        <img src={logo} className="h-8 w-auto" alt="logo" />
                        <span className="text-lg sm:text-2xl font-semibold text-white whitespace-nowrap">
                            Techno India Group
                        </span>
                    </a>

                    {/* Mobile toggles */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => {
                                setIsUserMenuOpen(!isUserMenuOpen);
                                if (!isUserMenuOpen) setIsMenuOpen(false);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                if (!isMenuOpen) setIsUserMenuOpen(false);
                            }}
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-red-700"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Main nav */}
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`}>
                        <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-4 md:mt-0 font-medium">
                            <li><a href="/dashboard" className="text-white hover:text-gray-300">Home</a></li>

                            {[1, 2, 3].map((num) => (
                                <li className="relative" key={num}
                                    onMouseEnter={() => setActiveDropdown(num)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="flex items-center text-white gap-1 hover:text-gray-300">
                                        Dropdown {num}
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    {activeDropdown === num && (
                                        <div className="absolute left-0 top-full bg-red-600 rounded-lg shadow-sm z-[999] min-w-[160px]">
                                            <ul className="py-2 text-sm text-white">
                                                <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Dashboard</a></li>
                                                <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                                <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Earnings</a></li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}



                            {/* User dropdown (desktop) */}
                            <div className="relative hidden md:block"
                                onMouseEnter={() => setActiveDropdown('user')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center text-white gap-1 hover:text-gray-300">
                                    <User className='w-5 h-5' />
                                </button>
                                {activeDropdown === 'user' && (
                                    <div className="absolute right-0 bg-red-600 rounded-lg shadow-sm z-[999] min-w-[140px]">
                                        <ul className="py-2 text-sm cursor-pointer text-white">
                                            <li><a href="/profile" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                            <li><a onClick={handleLogout} className="block px-4 py-2 hover:bg-red-700">Logout</a></li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Digital session timer */}
                            {timeLeft !== null && (
                                <li className="bg-red-500/30 text-white font-mono px-4 py-1 rounded-lg text-sm tracking-widest shadow-sm border border-white/30">
                                    ⏱ Session End In: {formatTime(timeLeft)}
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Mobile User Dropdown */}
                    {isUserMenuOpen && (
                        <div className="absolute right-4 top-16 md:hidden bg-red-600 rounded-lg shadow-sm z-[999] min-w-[140px]">
                            <ul className="py-2 text-sm text-white">
                                <li><a href="/profile" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                <li><a onClick={handleLogout} className="block px-4 py-2 hover:bg-red-700">Logout</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
