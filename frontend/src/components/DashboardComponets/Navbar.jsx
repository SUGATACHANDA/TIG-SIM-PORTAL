/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import logo from "../../assets/techno_logo.png";
import { User } from 'lucide-react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <nav className="relative bg-red-600 border-gray-200 dark:bg-red-600 dark:border-red-700">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">

                <a href="/dashboard" className="flex items-center space-x-3">
                    <img src={logo} className="h-8 w-auto" alt="logo" />
                    <span className="text-lg sm:text-2xl font-semibold text-white whitespace-nowrap">Techno India Group</span>
                </a>

                <div className="flex items-center gap-3 md:hidden">
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700">
                        <User className="w-5 h-5" />
                    </button>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-red-700 focus:outline-none">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`}>
                    <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-4 md:mt-0 font-medium">
                        <li><a href="/dashboard" className="text-white hover:text-gray-300">Home</a></li>

                        {/* Dropdown 1 */}
                        <li className="relative"
                            onMouseEnter={() => setActiveDropdown(1)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-white gap-1 hover:text-gray-300">
                                Dropdown 1
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {activeDropdown === 1 && (
                                <div className="absolute left-0 top-full bg-red-600 rounded-lg shadow-sm z-[999] min-w-[160px]">
                                    <ul className="py-2 text-sm text-white">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Dashboard</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Earnings</a></li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* Dropdown 2 */}
                        <li className="relative"
                            onMouseEnter={() => setActiveDropdown(2)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-white gap-1 hover:text-gray-300">
                                Dropdown 2
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {activeDropdown === 2 && (
                                <div className="absolute left-0 top-full bg-red-600 rounded-lg shadow-sm z-[999] min-w-[160px]">
                                    <ul className="py-2 text-sm text-white">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Dashboard</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Earnings</a></li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* Dropdown 3 */}
                        <li className="relative"
                            onMouseEnter={() => setActiveDropdown(3)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-white gap-1 hover:text-gray-300">
                                Dropdown 3
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {activeDropdown === 3 && (
                                <div className="absolute left-0 top-full bg-red-600 rounded-lg shadow-sm z-[999] min-w-[160px]">
                                    <ul className="py-2 text-sm text-white">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Dashboard</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Settings</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-red-700">Earnings</a></li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* User Dropdown (Desktop) */}
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
                    </ul>
                </div>

                {/* User Dropdown (Mobile) */}
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
    )
}

export default Navbar;
