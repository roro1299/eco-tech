    // frontend/src/pages/PatientForm.jsx
    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { useAuth } from '../context/AuthContext'; 

    const PatientForm = () => {
        const { id } = useParams(); 
        const navigate = useNavigate();
        const { isAuthenticated, loading } = useAuth(); 

        const [formData, setFormData] = useState({
            nombre: '',
            apellido: '',
            fechaNacimiento: '',
            ocupacion: '',
            genero: '', // 'Hombre' o 'Mujer'
            consultorio: 'Monterrey', // Por defecto
            totalSesiones: 0,
            avisoPrivacidad: false,
            telefono: '',
            email: '',
            direccion: '',
            motivoConsulta: '',
            historialMedico: {
                cirugias: { haRecibido: false, detalles: '' },
                transfusiones: { haRecibido: false, detalles: '' },
                embarazo: { estaEmbarazada: false, planeando: false, tratamientoFertilidad: false },
                marcapasos: { tiene: false },
                cancer: { haRecibidoTratamiento: false, detalles: '' }
            },
            notasMedicas: ''
        });
        const [isEditing, setIsEditing] = useState(false);
        const [submitLoading, setSubmitLoading] = useState(false);
        const [error, setError] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);

        useEffect(() => {
            if (loading) return;

            if (!isAuthenticated) {
                navigate('/login');
                return;
            }

            if (id) {
                setIsEditing(true);
                const fetchPatient = async () => {
                    try {
                        setError(null);
                        const res = await axios.get(`/api/Pacientes/${id}`);
                        const patientData = res.data;

                        // Formatear fecha para el input type="date" (YYYY-MM-DD)
                        if (patientData.fechaNacimiento) {
                            patientData.fechaNacimiento = new Date(patientData.fechaNacimiento).toISOString().split('T')[0];
                        }
                        setFormData(prevState => ({
                            ...prevState, // Mantenemos los valores por defecto
                            ...patientData, // Sobrescribimos con lo que trae la base de datos
                            historialMedico: {
                                ...prevState.historialMedico, // Mantenemos la estructura de cirugias, transfusiones, etc.
                                ...(patientData.historialMedico || {}) // Si no hay historial en la BD, se usa un objeto vacío sin romper nada
                            }
                        }));

                    } catch (err) {
                        console.error("Error al cargar Cliente para edición:", err.response ? err.response.data : err.message);
                        setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Error al cargar Cliente para edición.');
                    }
                };
                fetchPatient();
            } else {
                setIsEditing(false);
                // Resetear el formulario si no estamos editando
                setFormData({
                    nombre: '',
                    apellido: '',
                    fechaNacimiento: '',
                    ocupacion: '',
                    genero: '',
                    consultorio: 'Monterrey',
                    totalSesiones: 0,
                    telefono: '',
                    email: '',
                    direccion: '',
                    motivoConsulta: '',
                    avisoPrivacidad: false,
                    historialMedico: {
                        cirugias: { haRecibido: false, detalles: '' },
                        transfusiones: { haRecibido: false, detalles: '' },
                        embarazo: { estaEmbarazada: false, planeando: false, tratamientoFertilidad: false },
                        marcapasos: { tiene: false },
                        cancer: { haRecibidoTratamiento: false, detalles: '' }
                    },
                    notasMedicas: ''
                });
            }
        }, [id, isAuthenticated, loading, navigate]); // Dependencias

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        };

        const handleHistorialChange = (e, category, field) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            setFormData(prev => ({
                ...prev,
                historialMedico: {
                    ...prev.historialMedico,
                    [category]: {
                        ...prev.historialMedico[category],
                        [field]: value
                    }
                }
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmitLoading(true);
            setError(null);
            setSuccessMessage(null);

            // Validación básica
            if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
                setError('Nombre, apellido, email y teléfono son campos obligatorios.');
                setSubmitLoading(false);
                return;
            }

            try {
                if (isEditing) {
                    await axios.put(`/api/Pacientes/${id}`, formData);
                    setSuccessMessage('Cliente actualizado con éxito.');
                } else {
                    await axios.post('/api/Pacientes', formData);
                    setSuccessMessage('Cliente creado con éxito.');
                    // Limpiar formulario después de crear
                    setFormData({
                        nombre: '',
                        apellido: '',
                        fechaNacimiento: '',
                        ocupacion: '',
                        genero: '',
                        consultorio: 'Monterrey',
                        totalSesiones: 0,
                        telefono: '',
                        email: '',
                        direccion: '',
                        motivoConsulta: '',
                        avisoPrivacidad: false,
                        historialMedico: {
                            cirugias: { haRecibido: false, detalles: '' },
                            transfusiones: { haRecibido: false, detalles: '' },
                            embarazo: { estaEmbarazada: false, planeando: false, tratamientoFertilidad: false },
                            marcapasos: { tiene: false },
                            cancer: { haRecibidoTratamiento: false, detalles: '' }
                        },
                        notasMedicas: ''
                    });
                }
                setTimeout(() => navigate('/patients/list'), 1500); // Redirigir a la lista después de un tiempo
            } catch (err) {
                console.error("Error al guardar Cliente:", err.response ? err.response.data : err.message);
                setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Error al guardar Cliente.');
            } finally {
                setSubmitLoading(false);
            }
        };

        // Función para calcular edad
            const calcularEdad = (fecha) => {
                if (!fecha) return '';
                 const hoy = new Date();
                const nacimiento = new Date(fecha);
                let edad = hoy.getFullYear() - nacimiento.getFullYear();
                const m = hoy.getMonth() - nacimiento.getMonth();
                if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        };

        return (
            <div className="container mx-auto p-4 max-w-2xl bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {isEditing ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}
                </h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                            Fecha de Nacimiento:
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {/* Muestra la edad automáticamente */}
                            {formData.fechaNacimiento && (
                                <div className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 font-bold whitespace-nowrap">
                                    {calcularEdad(formData.fechaNacimiento)} años
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ocupacion" className="block text-sm font-medium text-gray-700">Ocupación:</label>
                        <input
                            type="text"
                            id="ocupacion"
                            name="ocupacion"
                            value={formData.ocupacion}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género:</label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="consultorio" className="block text-sm font-medium text-gray-700">Centro de reciclaje:</label>
                        <select
                            id="consultorio"
                            name="consultorio"
                            value={formData.consultorio}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Monterrey">Monterrey</option>
                            {/* Aquí podrás agregar más sucursales en el futuro */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                        <input
                            type="tel" // Usar type="tel" para teléfonos
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="totalSesiones" className="block text-sm font-medium text-gray-700">Total Cotizaciones:</label>
                        <input
                            type="number"
                            id="totalSesiones"
                            name="totalSesiones"
                            value={formData.totalSesiones}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-2"> {/* Email ocupa las dos columnas */}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="col-span-2"> {/* Dirección ocupa las dos columnas */}
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección:</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="motivoConsulta" className="block text-sm font-medium text-gray-700">Motivo de Cotizacion</label>
                        <textarea
                            id="motivoConsulta"
                            name="motivoConsulta"
                            value={formData.motivoConsulta}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Describa las necesidades"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    {/* Sección Historial Médico */}
                    <div className="col-span-2 border rounded-md p-4 bg-gray-50 mt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Historial</h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            
                            {/* Cirugías */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <label className="inline-flex items-center min-w-[150px]">
                                    <input type="checkbox" 
                                        checked={formData.historialMedico.cirugias.haRecibido}
                                        onChange={(e) => handleHistorialChange(e, 'cirugias', 'haRecibido')}
                                        className="form-checkbox h-5 w-5 text-indigo-600" />
                                    <span className="ml-2">Opiniones</span>
                                </label>
                                <input type="text" placeholder="¿Cuáles? ¿Hace cuánto?"
                                    value={formData.historialMedico.cirugias.detalles}
                                    onChange={(e) => handleHistorialChange(e, 'cirugias', 'detalles')}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md sm:text-sm" 
                                    disabled={!formData.historialMedico.cirugias.haRecibido} />
                            </div>

                            {/* Transfusiones */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <label className="inline-flex items-center min-w-[150px]">
                                    <input type="checkbox"
                                        checked={formData.historialMedico.transfusiones.haRecibido}
                                        onChange={(e) => handleHistorialChange(e, 'transfusiones', 'haRecibido')}
                                        className="form-checkbox h-5 w-5 text-indigo-600" />
                                    <span className="ml-2">Notas</span>
                                </label>
                                <input type="text" placeholder="¿Cuáles? ¿Hace cuánto?"
                                    value={formData.historialMedico.transfusiones.detalles}
                                    onChange={(e) => handleHistorialChange(e, 'transfusiones', 'detalles')}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md sm:text-sm"
                                    disabled={!formData.historialMedico.transfusiones.haRecibido} />
                            </div>

                            {/* Cáncer */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <label className="inline-flex items-center min-w-[150px]">
                                    <input type="checkbox"
                                        checked={formData.historialMedico.cancer.haRecibidoTratamiento}
                                        onChange={(e) => handleHistorialChange(e, 'cancer', 'haRecibidoTratamiento')}
                                        className="form-checkbox h-5 w-5 text-indigo-600" />
                                    <span className="ml-2">Fecha de cotizacion</span>
                                </label>
                                <input type="text" placeholder="¿Hace cuánto?"
                                    value={formData.historialMedico.cancer.detalles}
                                    onChange={(e) => handleHistorialChange(e, 'cancer', 'detalles')}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md sm:text-sm"
                                    disabled={!formData.historialMedico.cancer.haRecibidoTratamiento} />
                            </div>

                            {/* Marcapasos */}
                            <div className="flex items-center mt-2">
                                <label className="inline-flex items-center">
                                    <input type="checkbox"
                                        checked={formData.historialMedico.marcapasos.tiene}
                                        onChange={(e) => handleHistorialChange(e, 'marcapasos', 'tiene')}
                                        className="form-checkbox h-5 w-5 text-red-600" />
                                    <span className="ml-2 font-bold text-gray-700">Presupesto</span>
                                </label>
                            </div>

                            {/* Embarazo */}
                            <div className="mt-2 border-t pt-2">
                                <span className="block text-sm font-medium text-gray-700 mb-2">Centro de reciclaje</span>
                                <div className="flex flex-wrap gap-4">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox"
                                            checked={formData.historialMedico.embarazo.estaEmbarazada}
                                            onChange={(e) => handleHistorialChange(e, 'embarazo', 'estaEmbarazada')}
                                            className="form-checkbox h-5 w-5 text-indigo-600" />
                                        <span className="ml-2">Monterrey</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox"
                                            checked={formData.historialMedico.embarazo.planeando}
                                            onChange={(e) => handleHistorialChange(e, 'embarazo', 'planeando')}
                                            className="form-checkbox h-5 w-5 text-indigo-600" />
                                        <span className="ml-2">Guadalupe</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox"
                                            checked={formData.historialMedico.embarazo.tratamientoFertilidad}
                                            onChange={(e) => handleHistorialChange(e, 'embarazo', 'tratamientoFertilidad')}
                                            className="form-checkbox h-5 w-5 text-indigo-600" />
                                        <span className="ml-2">Apodaca</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-2"> {/* Notas Médicas ocupa las dos columnas */}
                        <label htmlFor="notasMedicas" className="block text-sm font-medium text-gray-700">Distancia</label>
                        <textarea
                            id="notasMedicas"
                            name="notasMedicas"
                            value={formData.notasMedicas}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <div className="col-span-2 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="avisoPrivacidad"
                                checked={formData.avisoPrivacidad}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-gray-900 font-bold">
                                ¿El Cliente firmó el Aviso de Privacidad?
                            </span>
                        </label>
                    </div>
                    <div className="col-span-2 text-right">
                        <button
                            type="button"
                            onClick={() => navigate('/patients/list')}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {submitLoading ? 'Guardando...' : (isEditing ? 'Actualizar Cliente' : 'Añadir Cliente')}
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    export default PatientForm;
    