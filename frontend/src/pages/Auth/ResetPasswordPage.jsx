// frontend/src/pages/Auth/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';

const ResetPasswordPage = () => {
    const { token } = useParams(); // Captura el token de la URL
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Intenta enviar la nueva contraseña al backend
            const res = await axios.post(`${API_URL}/api/users/reset-password/${token}`, { password });
            setMessage('¡Contraseña restablecida con éxito! Redirigiendo...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error: El enlace puede haber expirado o es inválido.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Restablecer Contraseña</h2>

            {message && <p style={{ color: 'blue', textAlign: 'center' }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Guardar Nueva Contraseña
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;