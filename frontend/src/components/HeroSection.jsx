// frontend/src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Listado de Centros de Reciclaje</h1>

        <p>Espacio donde la ciencia y la energía se unen para transformar tu salud y bienestar.
             </p>
             
             <p>📱 Residuos Electrónicos de Consumo
                Teléfonos móviles, tabletas, laptops, computadoras de escritorio y cualquier dispositivo personal en desuso.
                🖨️ Equipos de Oficina y Empresariales
                Impresoras, servidores, monitores, teclados y equipos corporativos que requieren una disposición adecuada.
                🔋 Baterías y Pilas
                  Uno de los residuos más contaminantes del planeta. Localizamos los puntos especializados para su correcto manejo.</p>
        <div className="hero-buttons">
          <a href="#servicios" className="btn btn-primary">Conoce Nuestros Servicios</a>
          <a href="#contacto" className="btn btn-secondary">Pide ayuda</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;