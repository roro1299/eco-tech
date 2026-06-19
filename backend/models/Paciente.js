const mongoose = require('mongoose');


const Pacienteschema = mongoose.Schema(
  { 
    user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    nombre: {
      type: String,
      required: [true, 'Por favor, añade un nombre'], 
      trim: true, 
    },
    apellido: {
      type: String,
      required: [true, 'Por favor, añade un apellido'],
      trim: true,
    },
    fechaNacimiento: {
      type: Date, 
      required: [true, 'Por favor, añade una fecha de nacimiento'],
    },
    ocupacion: {
      type: String,
      trim: true,
    },

    genero: {
      type: String,
      enum: ['Hombre', 'Mujer'],
    },
    avisoPrivacidad: {
      type: Boolean,
      default: false, // Por defecto no firmado
    },
    // Datos de control administrativo (basado en tu Excel)
    consultorio: {
      type: String, // Ej: Monterrey, CDMX
      trim: true,
      default: 'Monterrey'
    },
    totalSesiones: {
      type: Number,
      default: 0
    },

    telefono: {
      type: String,
      required: [true, 'Por favor, añade un número de teléfono'],
      unique: true, 
      trim: true,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, 'Por favor, ingresa un email válido'], // Valida formato de email
      unique: true, 
      sparse: true, 
      lowercase: true, 
    },
    direccion: {
      type: String,
      trim: true,
    },
    historialMedico: {
      cirugias: {
        haRecibido: { type: Boolean, default: false },
        detalles: { type: String, default: '' }
      },
      transfusiones: {
        haRecibido: { type: Boolean, default: false },
        detalles: { type: String, default: '' }
      },
      embarazo: {
        estaEmbarazada: { type: Boolean, default: false },
        planeando: { type: Boolean, default: false },
        tratamientoFertilidad: { type: Boolean, default: false }
      },
      marcapasos: {
        tiene: { type: Boolean, default: false }
      },
      cancer: {
        haRecibidoTratamiento: { type: Boolean, default: false },
        detalles: { type: String, default: '' }
      }
    },
    motivoConsulta: {
      type: String,
      trim: true
    },
    notasMedicas: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);


const Paciente = mongoose.model('Paciente', Pacienteschema);

module.exports = Paciente;