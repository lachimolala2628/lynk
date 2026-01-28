import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
    return (
        <nav className="bg-[#0A0A0A]">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side - App Name */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-mono text-[#ffffff]">
                            Lynk
                        </Link>
                    </div>

                    {/* Right side - Auth buttons */}
                    <div className="flex items-center">
                        {(false) ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Welcome, {userName || 'User'}</span>
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="bg-[#E5E5E5] text-[171717] px-4 py-2 rounded-xl text-sm font-mono"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;