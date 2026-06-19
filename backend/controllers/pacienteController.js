    // backend/controllers/PacienteController.js
    const asyncHandler = require('express-async-handler');
    const Paciente = require('../models/Paciente'); 
    const User = require('../models/User'); 

    // @desc    Obtener todos los Pacientes
    // @route   GET /api/Pacientes
    // @access  Private 
    const getPacientes = asyncHandler(async (req, res) => { 
        // req.user.id y req.user.role vienen del middleware 'protect'
        let query = {};

        
        if (req.user.role === 'therapist') {
            query = { user: req.user.id };
        }
        

        const Pacientes = await Paciente.find(query);
        res.status(200).json(Pacientes);
    });

    
    
    // @access  Private
    const getPacienteById = asyncHandler(async (req, res) => { 
        // CORRECCIÓN: paciente en minúscula
        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            res.status(404);
            throw new Error('Paciente no encontrado');
        }

        // Asegurarse de que el paciente pertenece al usuario logueado o que el usuario es admin
        if (paciente.user.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401); 
            throw new Error('No autorizado para ver este Paciente');
        }

        res.status(200).json(paciente);
    });
    // @desc    Crear un nuevo Paciente
    // @route   POST /api/Pacientes
    // @access  Private
    // @desc    Crear un nuevo Paciente
    // @route   POST /api/Pacientes
    // @access  Private
    const createPaciente = asyncHandler(async (req, res) => { 
        // 1. Extraemos TODOS los campos que necesitamos de req.body
        const { 
            nombre, apellido, fechaNacimiento, ocupacion, genero, 
            consultorio, totalSesiones, avisoPrivacidad, telefono, 
            email, direccion, motivoConsulta, historialMedico, notasMedicas 
        } = req.body;

        // 2. Validación básica (mantenemos la que ya tenías)
        if (!nombre || !apellido || !fechaNacimiento || !telefono || !email) { 
            res.status(400);
            throw new Error('Por favor, completa todos los campos requeridos: nombre, apellido, fecha de nacimiento, teléfono y email.');
        }

        // 3. Verificamos si ya existe alguien con ese teléfono o email
        // Esto evita que MongoDB explote feo por el unique: true
        const pacienteExiste = await Paciente.findOne({
            $or: [{ telefono }, { email }]
        });

        if (pacienteExiste) {
            res.status(400);
            throw new Error('Ya existe un cliente con ese mismo teléfono o correo electrónico.');
        }

        // 4. Creamos el paciente pasándole TODOS los datos
        const pacienteCreado = await Paciente.create({
            user: req.user.id, 
            nombre,
            apellido,
            fechaNacimiento,
            ocupacion,
            genero,
            consultorio,
            totalSesiones,
            avisoPrivacidad,
            telefono,
            email,
            direccion,
            motivoConsulta,
            historialMedico, // ¡Ahora sí guardamos el historial!
            notasMedicas
        });

        res.status(201).json(pacienteCreado);
    });

    // @desc    Actualizar un Paciente
    // @route   PUT /api/Pacientes/:id
    // @access  Private
    const updatePaciente = asyncHandler(async (req, res) => { 
        // CORRECCIÓN: paciente en minúscula
        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            res.status(404);
            throw new Error('Paciente no encontrado');
        }

        if (paciente.user.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('No autorizado para actualizar este Paciente');
        }

        // Aquí SÍ usamos Paciente con mayúscula porque estamos llamando al Modelo de Mongo
        const updatedPaciente = await Paciente.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true } 
        );

        res.status(200).json(updatedPaciente);
    });

    // @desc    Eliminar un Paciente
    // @route   DELETE /api/Pacientes/:id
    // @access  Private
    const deletePaciente = asyncHandler(async (req, res) => { 
        // CORRECCIÓN: paciente en minúscula
        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            res.status(404);
            throw new Error('Paciente no encontrado');
        }

        if (paciente.user.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('No autorizado para eliminar este Paciente');
        }

        // Usamos Paciente mayúscula para eliminar desde el modelo
        await Paciente.deleteOne({ _id: req.params.id }); 

        res.status(200).json({ message: 'Paciente eliminado correctamente' });
    });

    module.exports = {
        getPacientes,      
        getPacienteById,   
        createPaciente,    
        updatePaciente,    
        deletePaciente,    
    };