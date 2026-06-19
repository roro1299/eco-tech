// backend/routes/PacienteRoutes.js
const express = require('express');
const router = express.Router();
const {
    getPacientes,      
    getPacienteById,   
    createPaciente,    
    updatePaciente,    
    deletePaciente     
} = require('../controllers/PacienteController'); 

const { protect } = require('../middleware/authMiddleware'); 



router.route('/')
    .get(protect, getPacientes)   
    .post(protect, createPaciente); 

router.route('/:id')
    .get(protect, getPacienteById)  
    .put(protect, updatePaciente)   
    .delete(protect, deletePaciente); 

module.exports = router;