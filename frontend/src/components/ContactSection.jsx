// frontend/src/components/ContactSection.jsx
import React from 'react';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contacto">

      {/* ESTA ES LA LÍNEA DIRECTA QUE PIDES */}
      <hr style={{ 
        border: 'none', 
        borderTop: '3px solid #008DDA', 
        width: '80%',                   
        maxWidth: '1000px',             
        margin: '0 auto 60px auto',
        opacity: '0.4' 
      }} />

      <div className="container">
        <h2>Contáctanos</h2>
        <p className="subtitle">
          Estamos aquí para ayudarte. Ponte en contacto para resolver cualquier duda.
        </p>
        

        <div className="contact-content">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <p><i className="fas fa-phone-alt"></i> Teléfono: <a href="tel:+528116271817">(8137074388)</a></p>
            <p><i className="fas fa-envelope"></i> Email: <a href="ecotech44@gmail.com">ecotech44@gmail.com</a></p>
            <p><i className="fas fa-map-marker-alt"></i> Dirección: Centro 64000 Monterrey,NL Mexico</p>
            <p><i className="fas fa-clock"></i> Horario: Solo con cita</p>
            
            {/* Aquí podríamos añadir un formulario de contacto más adelante */}
            <a href="https://wa.me/528137074388" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <i className="fab fa-whatsapp"></i> Enviar Mensaje por WhatsApp
            </a>
          </div>

          <div className="contact-map">
            {/* Aquí irá un mapa de Google Maps o un placeholder por ahora */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11275.440043073393!2d-100.31455289766728!3d25.666201368050654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662be2befc8f705%3A0xd57f9d9407bf5722!2sMacroplaza!5e1!3m2!1ses-419!2smx!4v1775227775630!5m2!1ses-419!2smx"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio"
            ></iframe>
            {/* O un placeholder simple si prefieres no usar el mapa todavía:
            <div style={{ width: '100%', height: '350px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#555' }}>
                <p>Aquí irá un mapa o un formulario</p>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;