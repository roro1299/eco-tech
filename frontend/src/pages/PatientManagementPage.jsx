    // frontend/src/pages/PatientManagementPage.jsx
    import React from 'react';
    import { useAuth } from '../context/AuthContext'; 

    const PatientManagementPage = () => {
        const { user } = useAuth(); 

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Gestión de Clientes</h1>
                {user ? (
                    <p className="text-center text-lg">
                        ¡Bienvenido, {user.username}! Estás en la página de gestión de Clientes.
                        Tu rol es: <span className="font-semibold">{user.role}</span>.
                    </p>
                ) : (
                    <p className="text-center text-lg">Cargando información del usuario...</p>
                )}
                <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Aquí se listarán y gestionarán los Clientes.</h2>
                    <p>
                        (Esta es una página de ejemplo. Más adelante, añadiremos la funcionalidad CRUD completa para Clientes aquí).
                    </p>
                    {/* Aquí iría la tabla de Pacientes, botones para añadir, editar, eliminar, etc. */}
                </div>
            </div>
        );
    };

    export default PatientManagementPage;
    