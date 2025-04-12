import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // <-- Use this instead of window.location.href

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Token not found");
            setLoading(false);
            navigate("/"); // safer redirect
            return;
        }

        verifyToken(token)
            .then(res => {
                if (res.success) {
                    setUser(res.user);
                } else {
                    setError("Invalid token");
                    navigate("/");
                }
            })
            .catch(() => {
                setError("Verification failed");
                navigate("/");
            })
            .finally(() => setLoading(false));
    }, [navigate]); // important: include navigate as dependency

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
