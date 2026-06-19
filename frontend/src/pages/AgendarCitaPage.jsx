// frontend/src/pages/AgendarCitaPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AgendarCitaPage = () => {
  const [formData, setFormData] = useState({
    nombrePaciente: '',
    emailPaciente: '',
    telefonoPaciente: '',
    fechaCita: '',
    horaCita: '',
    motivoCita: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setIsError(false);

    try {
      // Asegúrate de que esta URL sea la correcta para tu backend
      const res = await axios.post('http://localhost:5000/api/citas', formData);
      setMessage(res.data.msg);
      setIsError(false);
      setFormData({ // Limpiar formulario
        nombrePaciente: '',
        emailPaciente: '',
        telefonoPaciente: '',
        fechaCita: '',
        horaCita: '',
        motivoCita: ''
      });
    } catch (err) {
      console.error('Error al enviar la cita:', err.response?.data?.msg || err.message);
      setMessage(err.response?.data?.msg || 'Error al agendar la cita. Por favor, inténtalo de nuevo.');
      setIsError(true);
    }
  };

  return (
    <section className="appointment-page-section"> {/* Nueva clase para esta página */}
      <div className="container">
        <h2>Agenda Tu Cita</h2>
        <p className="subtitle">
          Completa el siguiente formulario para solicitar tu cita de biomagnetismo médico. Nos pondremos en contacto contigo para confirmar.
        </p>
        <div className="appointment-form-container">
          <h3>Detalles de la Cita</h3>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="nombrePaciente">Nombre Completo:</label>
              <input
                type="text"
                id="nombrePaciente"
                name="nombrePaciente"
                value={formData.nombrePaciente}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailPaciente">Correo Electrónico:</label>
              <input
                type="email"
                id="emailPaciente"
                name="emailPaciente"
                value={formData.emailPaciente}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefonoPaciente">Teléfono (Opcional):</label>
              <input
                type="tel"
                id="telefonoPaciente"
                name="telefonoPaciente"
                value={formData.telefonoPaciente}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaCita">Fecha de la Informes:</label>
              <input
                type="date"
                id="fechaCita"
                name="fechaCita"
                value={formData.fechaCita}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="horaCita">Hora de la Cita:</label>
              <input
                type="time"
                id="horaCita"
                name="horaCita"
                value={formData.horaCita}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="motivoCita">Motivo (Opcional):</label>
              <textarea
                id="motivoCita"
                name="motivoCita"
                value={formData.motivoCita}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            {message && (
              <p className={`form-message ${isError ? 'error' : 'success'}`}>
                {message}
              </p>
            )}

            <button type="submit" className="btn btn-primary">Solicitar Informes</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgendarCitaPage;