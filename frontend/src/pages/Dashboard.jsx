import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
        <ul className="list-disc list-inside space-y-1">
            <li>Manage Users</li>
            <li>Manage Roles</li>
            <li>Settings</li>
        </ul>
    </div>
);

const ManagerDashboard = () => (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Manager Panel</h2>
        <ul className="list-disc list-inside space-y-1">
            <li>View Reports</li>
            <li>Manage Team</li>
        </ul>
    </div>
);

const UserDashboard = () => (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">User Panel</h2>
        <ul className="list-disc list-inside space-y-1">
            <li>View Profile</li>
            <li>Update Information</li>
        </ul>
    </div>
);

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Token not found. Please login again.");
            window.location.href = "/";
            return;
        }
        const API_URL = "https://tig-sim-portal-backend.vercel.app";
        // const API_URL = "http://localhost:5000";
        axios
            .post(`${API_URL}/verify-token`, { token })
            .then((res) => {
                if (res.data.success) {
                    setUser(res.data.user);
                } else {
                    alert("Invalid token");
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Session Expired. Please login again.");
                window.location.href = "/";
            });
    }, []);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
            </div>
        );
    }

    const renderRoleComponent = () => {
        switch (user.role_name) {
            case "Admin":
                return <AdminDashboard />;
            case "Manager":
                return <ManagerDashboard />;
            case "User":
                return <UserDashboard />;
            default:
                return <div>No Components for this Role</div>;
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>

                <div className="mb-4 text-center">
                    <h3 className="text-lg font-semibold">Welcome, {user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role_name}</p>
                    <p className="text-sm text-gray-500">Features: {user.features}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    {renderRoleComponent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
