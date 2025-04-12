import { createContext, useContext, useEffect, useState, useRef } from "react";
import { verifyToken } from "../api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const redirected = useRef(false); // ✅ flag to prevent double redirect

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            if (!redirected.current) {
                redirected.current = true;
                setError("Token not found");
                navigate("/");
            }
            return;
        }

        verifyToken(token)
            .then((res) => {
                if (res.success) {
                    setUser(res.user);
                } else {
                    if (!redirected.current) {
                        redirected.current = true;
                        setError("Invalid token");
                        navigate("/");
                    }
                }
            })
            .catch(() => {
                if (!redirected.current) {
                    redirected.current = true;
                    setError("Token verification failed");
                    navigate("/");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
