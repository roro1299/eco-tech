import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Nota: Ajusta la URL si tu backend no está en localhost:5000
            const response = await fetch(`${API_URL}/api/users/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Algo salió mal');
            }

            setMessage('¡Correo enviado! Revisa tu bandeja de entrada.');
            setEmail(''); // Limpiar campo
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Restablecer Contraseña</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            {message && <div style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>{message}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Ingresa tu correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Enviar Enlace
                </button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/login">Volver a Iniciar Sesión</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;