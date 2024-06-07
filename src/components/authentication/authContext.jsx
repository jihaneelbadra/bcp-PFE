import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
                setRole(response.data.role); // Récupérer le rôle de l'utilisateur
            }).catch(() => {
                localStorage.removeItem('token');
                navigate('/');
            });
        }
    }, [navigate]);

    const login = async (email, password) => {
        const response = await api.post('/auth/authenticate', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setRole(response.data.role); // Stocker le rôle de l'utilisateur
        navigate(response.data.role === 'ADMIN' ? '/admin' : '/executor');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setRole(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
