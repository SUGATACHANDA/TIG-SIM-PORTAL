import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../api';

const AutoLogout = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const handleLogout = async () => {
            await logoutUser(email);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/');
        };

        if (token) {
            const { exp } = jwtDecode(token);
            const expiryTime = exp * 1000 - Date.now();

            if (expiryTime <= 0) {
                handleLogout();
            } else {
                const logoutTimer = setTimeout(() => {
                    handleLogout();
                }, expiryTime);

                if (expiryTime > 10000) {
                    setTimeout(() => {
                        let timeLeft = 10;
                        setCountdown(timeLeft);

                        const interval = setInterval(() => {
                            timeLeft -= 1;
                            setCountdown(timeLeft);

                            if (timeLeft <= 0) {
                                clearInterval(interval);
                            }
                        }, 1000);
                    }, expiryTime - 10000);
                }

                return () => clearTimeout(logoutTimer);
            }
        }
    }, [navigate]);

    return (
        <>
            {countdown !== null && countdown > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        zIndex: 1000,
                    }}
                >
                    Auto logout in {countdown} seconds
                </div>
            )}
        </>
    );
};

export default AutoLogout;
