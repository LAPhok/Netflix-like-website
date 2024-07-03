import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    function saveAuthToken(token) {
        sessionStorage.setItem("authToken", token);
        setAuthToken(token);
    }

    function clearAuthToken() {
        sessionStorage.removeItem("authToken");
        setAuthToken(null);
    }

    return (
        <AuthContext.Provider value={{
            authToken,
            isAuthenticated: !!authToken,
            setAuthToken: saveAuthToken,
            clearAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}
