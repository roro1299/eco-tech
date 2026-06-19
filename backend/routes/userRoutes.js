// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const { forgotPassword, resetPassword } = require('../controllers/userController');

const generateToken = (id, role) => {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
        expiresIn: '1h', // El token expira en 1 hora
    });
};


// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, introduce todos los campos requeridos: nombre de usuario, email y contraseña.' });
    }

    try {
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Ya existe un usuario con ese correo electrónico.' });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Ya existe un usuario con ese nombre de usuario.' });
        }

        
        user = new User({
            username,
            email,
            password, 
            role: role || 'patient' 
        });

        // 4. Hashear la contraseña (bcryptjs)
        const salt = await bcrypt.genSalt(10); // Genera un 'salt' (cadena aleatoria)
        user.password = await bcrypt.hash(password, salt); // Hashea la contraseña con el salt

        
        await user.save();

        
        const payload = {
            user: {
                id: user.id,
                role: user.role 
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Usa la clave secreta del .env
            { expiresIn: '1h' }, // El token expira en 1 hora
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    msg: 'Usuario registrado y sesión iniciada exitosamente',
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @desc    Iniciar sesión de usuario
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return res.status(400).json({ msg: 'Por favor, introduce todos los campos: email y contraseña.' });
    }

    try {
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
        }

        
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    msg: 'Inicio de sesión exitoso',
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @desc    Recuperar contraseña
// @route   POST /api/users/forgotpassword
// @access  Public
router.post('/forgotpassword', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;