import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}