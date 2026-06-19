// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Importaremos los estilos que crearemos en el siguiente paso

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        {/* 1. Lado Izquierdo: Logo */}
        <div className="footer-section left">
          {/* Asegúrate de que tu logo esté en la carpeta public con este nombre, o ajusta la ruta */}
          <img src="/LOGOECHO.png" alt="Logo Biomagnetismo" className="footer-logo" />
        </div>

        {/* 2. Centro: Copyright */}
        <div className="footer-section center">
          <p>&copy; 2025 Eco Tech</p>
          <a href="/public/Aviso_Privacidad_EcoTech.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="privacy-link"
     >
    Aviso de Privacidad
  </a>
</div>

        {/* 3. Lado Derecho: Redes Sociales */}
        <div className="footer-section right">
          <p>Síguenos:</p>
          <div className="social-links">
            {/* Por ahora usamos texto/emoji, luego podemos poner iconos SVG */}
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
              Facebook
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;