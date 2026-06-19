// backend/routes/citaRoutes.js
const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita'); 

// @desc    Crear una nueva cita
// @route   POST /api/citas
// @access  Public
router.post('/', async (req, res) => {
    const { nombrePaciente, emailPaciente, telefonoPaciente, fechaCita, horaCita, motivoCita } = req.body;

    // Validación básica
    if (!nombrePaciente || !emailPaciente || !fechaCita || !horaCita) {
        return res.status(400).json({ msg: 'Por favor, incluye todos los campos requeridos: nombre, email, fecha y hora.' });
    }

    try {
        const nuevaCita = new Cita({
            nombrePaciente,
            emailPaciente,
            telefonoPaciente,
            fechaCita,
            horaCita,
            motivoCita
        });

        const citaGuardada = await nuevaCita.save();
        
        res.status(201).json({ msg: 'Cita agendada exitosamente', cita: citaGuardada });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ msg: 'Error del servidor al agendar la cita.' });
    }
});

// @desc    Obtener todas las citas
// @route   GET /api/citas
// @access  Public (por ahora)
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.find();
        res.status(200).json(citas);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error del servidor al obtener las citas.' });
    }
});

module.exports = router;