const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // La URL de conexión para tu MongoDB local.
    // 'biomagnetismo' será el nombre de nuestra base de datos.
    const conn = await mongoose.connect('mongodb://localhost:27017/ecotech', {
      // Estas opciones son para evitar advertencias en la consola
      // Aunque en versiones recientes de Mongoose, ya no son estrictamente necesarias,
      // es buena práctica mantenerlas o al menos conocerlas.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Sale del proceso con un error
  }
};

module.exports = connectDB;