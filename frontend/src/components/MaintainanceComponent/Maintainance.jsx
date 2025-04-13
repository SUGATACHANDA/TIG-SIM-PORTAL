import React from 'react';
import { FaCog } from 'react-icons/fa';
import '../MaintainanceComponent/Maintainance.css'; // Import the CSS file for animations

const Maintenance = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center text-white px-4">
            <div className="text-center max-w-xl">
                <div className="flex justify-center mb-8 space-x-4">
                    <FaCog className="animate-spin-slow text-6xl text-red-500" />
                    <FaCog className="animate-spin-reverse text-5xl text-gray-300 mt-2" />
                    <FaCog className="animate-spin-slow text-4xl text-red-600 mt-4" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Scheduled Maintenance</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6">
                    We're working hard to improve your experience. The site will be back online on:
                </p>
                <p className="text-2xl font-semibold text-red-400 mb-8">
                    <span className="bg-black bg-opacity-30 px-3 py-1 rounded-xl">
                        April 27th, 2025 – 10:00 AM IST
                    </span>
                </p>
                <p className="text-sm text-gray-400 italic">
                    We appreciate your patience. If you have urgent queries, please contact support.
                </p>
            </div>
        </div>
    );
};

export default Maintenance;
