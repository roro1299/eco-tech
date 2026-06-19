    // backend/middleware/authMiddleware.js
    const jwt = require('jsonwebtoken');
    const asyncHandler = require('express-async-handler');
    const User = require('../models/User');

    const protect = asyncHandler(async (req, res, next) => {
        let token;

        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Obtener token de la cabecera
                token = req.headers.authorization.split(' ')[1];

                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                
                
                req.user = await User.findById(decoded.user.id).select('-password'); 

                // Si no se encuentra el usuario, es un token inválido o usuario no existe
                if (!req.user) {
                    res.status(401); 
                    throw new Error('Token inválido, usuario no encontrado');
                }

                next(); // Pasa al siguiente middleware o a la función de la ruta
            } catch (error) {
                console.error("Error en authMiddleware:", error); // Para depuración
                res.status(401); 
                throw new Error('No autorizado, token fallido');
            }
        }

        
        if (!token) {
            res.status(401); 
            throw new Error('No autorizado, no hay token');
        }
    });

    
    const authorize = (...roles) => { 
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                res.status(403); // Prohibido (Forbidden)
                throw new Error(`Acceso denegado. Rol de usuario "${req.user ? req.user.role : 'desconocido'}" no tiene permiso para realizar esta acción.`);
            }
            next();
        };
    };

    module.exports = {
        protect,
        authorize
    };
    