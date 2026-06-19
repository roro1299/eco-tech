    // frontend/src/components/Header.jsx
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { HashLink } from 'react-router-hash-link';
    import BIO_LOGO from '../assets/LOGOECHO.png';
    import { useAuth } from '../context/AuthContext';

    const Header = () => {
        const { isAuthenticated, user, logout } = useAuth();

       
       console.log("¿Está autenticado?:", isAuthenticated);
        console.log("Datos del usuario:", user);

       
        // Determinar si el usuario tiene permiso para ver la gestión de Pacientes
        const canManagePatients = isAuthenticated && (user && (user.role === 'admin' || user.role === 'therapist'));
        const isAdmin = isAuthenticated && user && user.role === 'admin';

        return (
            <header className="main-header">
                <div className="header-content">
                    <div className="logo">
                        <Link to="/">
                            <img src={BIO_LOGO} alt="Biomagnetismo Médico Logo" className="logo-img" />
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><HashLink to="/#servicios" smooth>Mapa</HashLink></li>
                            <li><HashLink to="/#quienes-somos" smooth>Quiénes Somos</HashLink></li>
                            <li><HashLink to="/#contacto" smooth>Contacto</HashLink></li>

                            {/* --- NUEVO ENLACE: Gestión de Pacientes (Condicional por Rol) --- */}
                            {canManagePatients && (
                                <li>
                                    <Link to="/patients/list">Gestión de Clientes</Link>
                                </li>
                            )}
                            {/* ------------------------------------------------------------- */}

                            {/* --- Lógica Condicional para Autenticación --- */}
                            {isAuthenticated ? (
                                // If user is authenticated
                                <>
                                    {user && <li className="text-black">¡Hola, {user.username || user.email}!</li>}
                                    {/* Solo Admin puede ver "Registrar" */}
                                {isAdmin && (
                                    <li><Link to="/register">Registrar Usuario</Link></li>
                                )}
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                
                                <>
                                   
                                    <li><Link to="/login">Iniciar Sesión</Link></li>
                                </>
                            )}
                            {/* ------------------------------------- */}
                        </ul>
                    </nav>
                    <div className="contact-button">
                        <Link to="/agendar-cita" className="btn-agendar">Para Mayor Informacion</Link>
                    </div>
                </div>
            </header>
        );
    };

    export default Header;
    