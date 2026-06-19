// backend/models/User.js
const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Por favor, añade un nombre de usuario'],
            unique: true, 
            trim: true,
            minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
        },
        email: {
            type: String,
            required: [true, 'Por favor, añade un correo electrónico'],
            unique: true, 
            trim: true,
            lowercase: true, 
            match: [/.+@.+\..+/, 'Por favor, usa un correo electrónico válido'] // Valida formato
        },
        password: {
            type: String,
            required: [true, 'Por favor, añade una contraseña'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },
        role: {
            type: String,
            enum: ['admin', 'therapist', 'patient'], 
            default: 'patient' 
        },

        resetPasswordToken: String,
        resetPasswordExpire: Date

    },
    {
        timestamps: true 
    }
);


module.exports = mongoose.model('User', userSchema);