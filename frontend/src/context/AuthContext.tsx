import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

interface UserType {
    user_id: string;
    username: string;
    email: string;
    created_at: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (email: string, username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/current`)
            .then((res) => {
                setUser(res.data.user);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setUser(null);
                setIsAuthenticated(false);
            });
    }, []);

    const signup = async (email: string, username: string, password: string) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/users/signup`,
                { email, username, password },
                { withCredentials: true }
            );

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/current`);
            setUser(res.data.user);
            setIsAuthenticated(true);

        } catch (err) {
            console.error("SIGNUP ERROR", err);
            throw err;
        }
    };

    const login = async (username: string, password: string) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/users/login`,
                { username, password }
            );

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/current`);
            setUser(res.data.user);
            setIsAuthenticated(true);

        } catch (err) {
            console.error("LOGIN ERROR", err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/logout`, {});
            setUser(null);
            setIsAuthenticated(false);

        } catch (err) {
            console.error("LOGOUT FAILED", err);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
