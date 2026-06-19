// backend/server.js
    // Importa la librería Express
    const express = require('express');
    const dotenv = require('dotenv');
    const connectDB = require('./config/db'); 
    const cors = require('cors');
    const { errorHandler } = require('./middleware/errorMiddleware'); 

    dotenv.config();

    connectDB(); 

    
    const app = express();

    //Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false })); 

    
    const PacienteRoutes = require('./routes/pacienteRoutes'); 
    const citaRoutes = require('./routes/citaRoutes');
    const userRoutes = require('./routes/userRoutes');


    
    app.use('/api/Pacientes', PacienteRoutes); 
    app.use('/api/citas', citaRoutes);
    app.use('/api/users', userRoutes);



    
    const PORT = process.env.PORT || 5000; // Usa el puerto 5000 

    
    
    app.get('/', (req, res) => {
        res.send('¡Backend de Biomagnetismo funcionando!');
    });

    
    app.use(errorHandler);


    
    app.listen(PORT, () => {
        console.log(`Servidor de backend ejecutándose en el puerto ${PORT}`);
    });