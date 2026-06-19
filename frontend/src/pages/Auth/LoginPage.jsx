// frontend/src/pages/Auth/LoginPage.jsx
    import React, { useState, useEffect } from 'react'; 
    // import axios from 'axios'; 
    import { useNavigate, Link } from 'react-router-dom';
    import { useAuth } from '../../context/AuthContext'; 

    const LoginPage = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const { email, password } = formData;
        const navigate = useNavigate();
        const { login, isAuthenticated } = useAuth(); 

        // Redirigir si ya está autenticado
        useEffect(() => {
            if (isAuthenticated) {
                navigate('/'); 
            }
        }, [isAuthenticated, navigate]);

        const onChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const onSubmit = async (e) => {
            e.preventDefault();

            
            const success = await login(email, password); 

            if (success) {
                // navigate('/'); // Ya lo manejamos con el useEffect superior si isAuthenticated cambia
            } else {
                // El alert de error ya lo maneja el AuthContext
            }
        };

        return (
            <div className="container mx-auto p-4 max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
                <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Iniciar Sesión
                        </button>

                        <Link 
                            to="/forgot-password" 
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                           ¿Olvidaste tu contraseña?
                       </Link>

                    </div>
                </form>
            </div>
        );
    };

    export default LoginPage;
    