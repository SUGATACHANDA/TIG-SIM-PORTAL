import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token not found");
            setLoading(false);
            return window.location.href = "/";
        }

        verifyToken(token)
            .then(res => {
                if (res.success) setUser(res.user);
                else {
                    setError("Invalid token");
                    window.location.href = "/";
                }
            })
            .catch(() => {
                setError("Verification failed");
                window.location.href = "/";
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
