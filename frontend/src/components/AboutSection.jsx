import React from 'react';

import aboutImage from '../assets/ECHO3.jpg'; 

const AboutSection = () => {
  return (
    <section className="about-section" id="quienes-somos">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Quiénes Somos</h2>
            <p>Eco-Tech es una plataforma digital dedicada a facilitar la correcta disposición de residuos tecnológicos, conectando a ciudadanos y empresas con los puntos de recolección y reciclaje de e-waste más cercanos a su ubicación.
A través de un mapa interactivo actualizado, Eco-Tech pone al alcance de todos la información necesaria para desechar de manera responsable dispositivos electrónicos como teléfonos, computadoras, baterías y electrodomésticos en desuso, contribuyendo activamente a la reducción del impacto ambiental generado por la tecnología.
Nuestra plataforma nace de la convicción de que el acceso a la información es el primer paso hacia un cambio real. Porque cuando las personas saben dónde y cómo reciclar, toman mejores decisiones para el planeta.

            </p>
            <h4>Nos distingue:</h4>
            <p>             
  Información centralizada
Reunimos en un solo lugar todos los centros de acopio, empresas recicladoras y puntos de disposición de e-waste, eliminando la necesidad de buscar en múltiples fuentes.            </p>
            <ul>
              <li><i className="fas fa-check-circle"></i> Enfoque Holístico y Personalizado</li>
              <li><i className="fas fa-check-circle"></i> Terapia Complementaria no Invasiva</li>
              <li><i className="fas fa-check-circle"></i> Promoción del Equilibrio Energético</li>
            </ul>
            <a href="#contacto" className="btn btn-primary">Contáctanos para más Información</a>
          </div>
          {/* Solo renderiza la imagen si la tienes importada */}
          {aboutImage && (
            <div className="about-image">
              <img src={aboutImage} alt="Biomagnetismo Médico" />
              <p className="about-slogan">"Recicla hoy, protege el mañana."
                      "El futuro no se desecha, se recicla."
                      "Dale una segunda vida al planeta."</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;