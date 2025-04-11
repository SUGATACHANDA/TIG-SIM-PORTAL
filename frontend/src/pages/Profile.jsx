import React, { useEffect, useState } from 'react';
import { verifyToken, requestEditProfile } from '../api';
import Loader from '../components/DashboardComponets/Loader';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [showTextarea, setShowTextarea] = useState(false);
    const [requestText, setRequestText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        verifyToken(token)
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                } else {
                    alert("Invalid token");
                    window.location.href = "/";
                }
            })
            .catch(() => {
                window.location.href = "/";
            });
    }, []);

    const handleSendRequest = async () => {
        if (!requestText.trim()) return alert("Please write your request.");
        setLoading(true);
        try {
            await requestEditProfile(user.email, requestText);
            toast.success("Request sent successfully");
            setRequestText("");
            setShowTextarea(false);
        } catch (error) {
            toast.error("Failed to send request");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6">

                <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-500 to-red-700 flex items-center justify-center text-white text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 mt-2">{user.role_name}</span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => setShowTextarea(!showTextarea)}
                        className='w-full max-w-xs mx-auto py-2 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center whitespace-nowrap'
                    >
                        {showTextarea ? "Cancel" : "Request Profile Edit"}
                    </button>

                    {showTextarea && (
                        <div className="space-y-2 mt-2">
                            <textarea
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                rows="4"
                                placeholder="Write your request..."
                                value={requestText}
                                onChange={(e) => setRequestText(e.target.value)}
                            />
                            <button
                                onClick={handleSendRequest}
                                className="w-full max-w-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                {loading ? 'Sending Request...' : 'Send Request'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
