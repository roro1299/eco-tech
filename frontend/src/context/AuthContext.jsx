// frontend/src/context/AuthContext.jsx
    import React, { createContext, useState, useContext, useEffect } from 'react';
    import axios from 'axios'; // Asegúrate de que axios esté importado

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true); 

        
        const setAuthData = (token, userData) => {
            localStorage.setItem('token', token); 
            localStorage.setItem('user', JSON.stringify(userData)); 
            setIsAuthenticated(true);
            setUser(userData);
            // Configura el encabezado de autorización predeterminado para todas las solicitudes de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log("AuthContext: Datos de autenticación establecidos y guardados en localStorage."); // DEBUG
        };

        // Función auxiliar para limpiar el estado de autenticación y eliminar de localStorage
        const clearAuthData = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Elimina el objeto user
            setIsAuthenticated(false);
            setUser(null);
            // Elimina el encabezado de autorización de Axios
            delete axios.defaults.headers.common['Authorization'];
            console.log("AuthContext: Datos de autenticación limpiados de localStorage."); // DEBUG
        };

        // useEffect para cargar el token y los datos del usuario desde localStorage al inicio de la aplicación
        useEffect(() => {
            const loadAuthFromStorage = async () => {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                console.log("AuthContext: Cargando desde localStorage. Token:", token ? "presente" : "ausente", "User:", storedUser ? "presente" : "ausente"); // DEBUG

                if (token && storedUser) {
                    try {
                        const userData = JSON.parse(storedUser);
                        
                        
                        setAuthData(token, userData);
                        console.log("AuthContext: Datos cargados y establecidos desde localStorage."); // DEBUG
                    } catch (error) {
                        console.error("AuthContext: Error al cargar datos de autenticación del localStorage o al parsear user:", error); // DEBUG
                        clearAuthData(); // Limpiar si hay algún error
                    }
                }
                setLoading(false); // La carga inicial ha terminado
                console.log("AuthContext: Carga inicial finalizada. isAuthenticated:", isAuthenticated, "User:", user); // DEBUG
            };

            loadAuthFromStorage();
        }, []); // Se ejecuta solo una vez al montar el componente

        // Función de registro
        const register = async (username, email, password, role) => {
            setLoading(true);
            try {
                const res = await axios.post('/api/users/register', { username, email, password, role });
                setAuthData(res.data.token, res.data.user);
                alert('Registro exitoso. ¡Bienvenido!');
                setLoading(false);
                return true;
            } catch (err) {
                console.error("AuthContext: Error en registro:", err.response ? err.response.data : err.message); // DEBUG
                alert(err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Error en el registro. Inténtalo de nuevo.');
                setLoading(false);
                return false;
            }
        };

        // Función de inicio de sesión
        const login = async (email, password) => {
            setLoading(true);
            try {
                const res = await axios.post('/api/users/login', { email, password });
                setAuthData(res.data.token, res.data.user);
                alert('Inicio de sesión exitoso. ¡Bienvenido!');
                setLoading(false);
                return true;
            } catch (err) {
                console.error("AuthContext: Error en login:", err.response ? err.response.data : err.message); // DEBUG
                alert(err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Credenciales inválidas. Inténtalo de nuevo.');
                setLoading(false);
                return false;
            }
        };

        // Función de cierre de sesión
        const logout = () => {
            clearAuthData();
            alert('Sesión cerrada.');
        };

        return (
            <AuthContext.Provider value={{ isAuthenticated, user, loading, register, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);