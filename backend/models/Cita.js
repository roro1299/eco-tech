// backend/models/Cita.js
const mongoose = require('mongoose');


const citaSchema = mongoose.Schema(
    {
        nombrePaciente: {
            type: String,
            required: [true, 'Por favor, añade el nombre del Paciente'],
            trim: true 
        },
        emailPaciente: {
            type: String,
            required: [true, 'Por favor, añade el correo electrónico del Paciente'],
            match: [/.+@.+\..+/, 'Por favor, usa un correo electrónico válido'], // Valida formato de email
            trim: true,
            lowercase: true 
        },
        telefonoPaciente: {
            type: String,
            default: '', 
            trim: true
        },
        fechaCita: {
            type: Date, 
            required: [true, 'Por favor, añade la fecha de la cita']
        },
        horaCita: {
            type: String, 
            required: [true, 'Por favor, añade la hora de la cita']
        },
        motivoCita: {
            type: String,
            default: '' 
        },
        estado: {
            type: String,
            enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'], 
            default: 'Pendiente' 
        }
    },
    {
        timestamps: true 
    }
);


module.exports = mongoose.model('Cita', citaSchema);