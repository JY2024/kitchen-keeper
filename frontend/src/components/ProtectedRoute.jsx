import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../api.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        try {
            auth()
        } catch (error) {
            setIsAuthorized(false)
        }
        // auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setIsAuthorized(false);
                return;
            }
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;
        
            if (tokenExpiration < now) {
                try {
                    await refreshToken();
                } catch (err) {
                    console.error("Error refreshing token:", error);
                }

            } else {
                setIsAuthorized(true);
            }
        }
        catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    if (isAuthorized) {
        return children;
    }
    else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;