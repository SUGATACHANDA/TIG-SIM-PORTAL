import React from 'react';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const token = localStorage.getItem('token');

    let email = '';
    try {
        const decoded = jwtDecode(token);
        email = decoded.email;
    } catch (err) {
        console.error('Token decode error:', err);
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-2">Welcome to Dashboard</h1>
            {email && (
                <p className="text-lg">
                    Logged in as: <span className="font-semibold">{email}</span>
                </p>
            )}
        </div>
    );
};

export default Dashboard;
