    // frontend/src/pages/PatientList.jsx
    import React, { useEffect, useState, useCallback } from 'react';
    import axios from 'axios';
    import { useAuth } from '../context/AuthContext';
    import { useNavigate } from 'react-router-dom';

    const PatientList = () => {
        const { user, isAuthenticated, loading } = useAuth();
        const navigate = useNavigate();
        const [patients, setPatients] = useState([]);
        const [loadingPatients, setLoadingPatients] = useState(true);
        const [error, setError] = useState(null);
        const [deleteMessage, setDeleteMessage] = useState(null);

        const fetchPatients = useCallback(async () => {
            try {
                setLoadingPatients(true);
                setError(null);
                const res = await axios.get('/api/Pacientes');
                setPatients(res.data);
                console.log("Clientes cargados:", res.data);
            } catch (err) {
                console.error("Error al cargar Clientes:", err.response ? err.response.data : err.message);
                setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Error al cargar Clientes.');
                // Si el error es 401/403, el AuthContext debería manejar la redirección o el usuario debería ser logout
            } finally {
                setLoadingPatients(false);
            }
        }, []);

        useEffect(() => {
            if (loading) {
                return;
            }
            if (!isAuthenticated) {
                navigate('/login');
                return;
            }
            fetchPatients();
        }, [isAuthenticated, loading, navigate, fetchPatients]);

        const handleDelete = async (id) => {
            if (window.confirm('¿Estás seguro de que quieres eliminar este Cliente? Esta acción es irreversible.')) {
                try {
                    await axios.delete(`/api/Pacientes/${id}`);
                    setDeleteMessage('Cliente eliminado con éxito.');
                    fetchPatients();
                    setTimeout(() => setDeleteMessage(null), 3000);
                } catch (err) {
                    console.error("Error al eliminar Cliente:", err.response ? err.response.data : err.message);
                    setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Error al eliminar Paciente.');
                }
            }
        };

        if (loadingPatients) {
            return <div className="text-center p-4">Cargando Clientes...</div>;
        }

        if (error) {
            return <div className="text-center p-4 text-red-600">Error: {error}</div>;
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Lista de Clientes</h1>
                {user && (
                    <p className="text-center text-lg mb-4">
                        Bienvenido, <span className="font-semibold">{user.username}</span>.
                        Tu rol es: <span className="font-semibold">{user.role}</span>.
                    </p>
                )}

                {deleteMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{deleteMessage}</div>}


                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate('/patients/add')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Añadir Nuevo Cliente
                    </button>
                </div>

                {patients.length === 0 ? (
                    <p className="text-center text-gray-600">No hay Clientes registrados aún.</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre Completo
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Teléfono
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha Nacimiento
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {patients.map((patient) => (
                                    <tr key={patient._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {patient.nombre} {patient.apellido}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.telefono}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(patient.fechaNacimiento).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => navigate(`/patients/edit/${patient._id}`)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-2"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(patient._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    export default PatientList;
    