    // frontend/src/utils/PrivateRoute.jsx
    import React from 'react';
    import { Navigate, Outlet } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext'; 

    const PrivateRoute = ({ children, allowedRoles }) => {
        const { isAuthenticated, user, loading } = useAuth(); 
        
        
        if (loading) {
            return <div>Cargando...</div>; // O un componente de carga <Spinner /> o null para no mostrar nada
        }

        // Si el usuario NO está autenticado, redirige al login
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        
        
        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
            console.log(`Acceso denegado. Rol del usuario: ${user.role}, Roles permitidos: ${allowedRoles.join(', ')}`); // Mensaje de depuración
            return <Navigate to="/" replace />; // Redirige a la página principal si no tiene el rol adecuado
        }

        
        return children ? children : <Outlet />;
    };

    export default PrivateRoute;
    