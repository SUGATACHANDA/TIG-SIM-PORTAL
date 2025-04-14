// src/components/SessionModal.jsx
import React from 'react';

const SessionModal = ({ secondsLeft }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">Session Expiring</h2>
                <p className="text-gray-700 mb-4">
                    Your session will expire in <span className="text-red-500 font-semibold">{secondsLeft}</span> seconds.
                </p>
                <p className="text-sm text-gray-500">You will be redirected automatically.</p>
            </div>
        </div>
    );
};

export default SessionModal;
