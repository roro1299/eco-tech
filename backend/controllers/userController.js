// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler'); 
const User = require('../models/User'); 

const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validación: Asegurarse de que todos los campos requeridos estén presentes
    if (!username || !email || !password || !role) {
        res.status(400);
        throw new Error('Por favor, ingresa todos los campos: nombre de usuario, email, contraseña y rol.');
    }

    
    const validRoles = ['admin', 'therapist', 'patient']; // Define tus roles válidos
    if (!validRoles.includes(role)) {
        res.status(400);
        throw new Error('Rol de usuario inválido. Los roles permitidos son: admin, therapist, patient.');
    }

    
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe con ese email.');
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
    });

    // Respuesta si el usuario se crea con éxito
    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role), // Genera un token JWT
            user: { 
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
    }
});

// @desc    Autenticar un usuario (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Verificar email del usuario
    const user = await User.findOne({ email });

    // Verificar contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role), 
            user: { 
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } else {
        res.status(400);
        throw new Error('Credenciales inválidas');
    }
});

// @desc    Obtener datos del usuario logueado
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // req.user se establece por el middleware 'protect'
    res.status(200).json(req.user);
});

// @desc    Recuperar contraseña olvidada
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('No existe un usuario con ese email');
    }

    // Generar token de reseteo
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashear token y guardarlo en el usuario (DB)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos

    await user.save({ validateBeforeSave: false });

    // Crear URL de reseteo (Frontend)
    // Nota: Asumo que tu React corre en el puerto 5173 (Vite) o 3000. Ajusta si es necesario.
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("---------------------------------------------------------");
    console.log("CLICK AQUÍ PARA RESTABLECER (Copiar el link):");
    console.log(resetUrl);
    console.log("---------------------------------------------------------");

    const message = `
      <h1>Has solicitado restablecer tu contraseña</h1>
      <p>Por favor ve al siguiente enlace:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
        await sendEmail({
            to: user.email,
            subject: 'Restablecimiento de Contraseña - Biomagnetismo',
            text: message
        });

        res.status(200).json({ success: true, data: 'Correo enviado' });
    } catch (error) {
        console.log('ERROR AL ENVIAR CORREO:', error); 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(500);
        throw new Error('El correo no pudo ser enviado');
    }
});

// Generar Token JWT
const generateToken = (id, role) => {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
        expiresIn: '1h', // El token expirará en 1 hora
    });
};

// @desc    Restablecer la contraseña (cuando el usuario envía el nuevo password)
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    // 1. Obtener el token de la URL y hashearlo (para buscar en la DB)
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // 2. Buscar usuario por token y expiración
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } // $gt: greater than (que no haya expirado)
    });

    if (!user) {
        res.status(400);
        throw new Error('El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.');
    }

    // 3. Hashear la nueva contraseña y guardarla
    if (req.body.password.length < 6) {
        res.status(400);
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // 4. Limpiar los campos de token de reinicio
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión.' });
});



module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword, 
    resetPassword,
};