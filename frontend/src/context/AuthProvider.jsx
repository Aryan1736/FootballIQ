import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { loginRequest, registerRequest } from "../services/authService";
import {
    clearAuthSession,
    getStoredToken,
    getStoredUser,
    storeAuthSession
} from "../services/tokenStorage";

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => getStoredToken());
    const [user, setUser] = useState(() => getStoredUser());

    const saveSession = useCallback((session) => {
        storeAuthSession(session);
        setToken(session.token);
        setUser(session.user);
        return session;
    }, []);

    const login = useCallback(
        async (credentials) => {
            const session = await loginRequest(credentials);
            return saveSession(session);
        },
        [saveSession]
    );

    const register = useCallback(
        async (details) => {
            const session = await registerRequest(details);
            return saveSession(session);
        },
        [saveSession]
    );

    const logout = useCallback(() => {
        clearAuthSession();
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: Boolean(token && user),
            login,
            register,
            logout
        }),
        [token, user, login, register, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
