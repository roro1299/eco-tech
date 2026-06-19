// frontend/src/components/ServicesSection.jsx
import React from 'react';

import bannerImage from '../assets/ECHO2.jpeg';

const ServicesSection = () => {
  // Datos de ejemplo para los servicios
  const services = [
    {
      id: 1,
      title: '1. EcoRecicla Monterrey. ',
      description: '📍 Av. Constitución 450, Col. Centro, Monterrey ✅ Acepta: Computadoras, laptops, teléfonos, tablets, cables y cargadores.',
      icon: 'fas fa-magnet' // Icono de ejemplo (requiere Font Awesome)
    },
    {
      id: 2,
      title: '2. TechCiclo NL',
      description: '📍 Blvd. Luis Donaldo Colosio 1200, Col. Los Treviño, Santa Catarina ✅ Acepta: Servidores, equipos de oficina, impresoras, monitores y teclados.',
      icon: 'fas fa-yin-yang'
    },
    {
      id: 3,
      title: '3. GreenByte Reciclaje',
      description: '📍 Av. Garza Sada 3200, Col. Tecnológico, Monterrey ✅ Acepta: Baterías, pilas, celulares, laptops y electrodomésticos pequeños.',
      icon: 'fas fa-notes-medical'
    },
    {
      id: 4,
      title: '4. Punto Verde Electrónico',
      description: '📍 Av. Eugenio Garza Lagüera 850, Col. Valle Oriente, San Pedro Garza García ✅ Acepta: Televisores, consolas, equipos de audio, cables y accesorios.',
      icon: 'fas fa-gem'
    },
  {
      id: 5,
      title: '5. ReciclaTech Guadalupe',
      description: '📍 Av. Pablo González 560, Col. Industrial, Guadalupe ✅ Acepta: Equipos industriales, maquinaria electrónica, servidores y UPS.',
      icon: 'fas fa-sort-numeric-up'
    },
    {
      id: 6,
      title: '6. EcoPoint Apodaca',
      description: '📍 Av. Sendero Divisorio 980, Col. Cumbres Platinum, Apodaca ✅ Acepta: Teléfonos, tablets, laptops, baterías, cables y electrodomésticos tecnológicos.',
      icon: 'fas fa-dna'
    }
  ];

const publicos = [
    { 
      text: '👤 Ciudadanos Conscientes', 
      icon: 'fas fa-users' 
    },
    { 
      text: '🏢 Empresas y Corporativos', 
      icon: 'fas fa-paw' 
    },
    { 
      text: '🏫 Instituciones Educativas', 
      icon: 'fas fa-briefcase' 
    },
    { 
      text: '🏛️ Dependencias de Gobierno', 
      icon: 'fas fa-heart' 
    }
  ];

  const pilar = services[0]
  const otrasTerapias = services.slice(1);

  return (
    <section className="services-section" id="servicios">
      <div className="container">
        <h2>Nuestros Servicios</h2>
        <p className="subtitle">Encuentra de forma rápida y sencilla el centro de acopio o recicladora de e-waste más cercano a tu ubicación, con información detallada de dirección y materiales aceptados.</p>
        </div>
        <div className="unified-services-wrapper">

          <div className="main-service-callout">
          <h2>🌿 {pilar.title}</h2>
          <p>{pilar.description}</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div className="service-card" key={service.id}>
              {/* Si usas Font Awesome, asegúrate de importarlo en index.html o index.css */}
              <i className={`${service.icon} service-icon`}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        </div>

        {/* --- SERVICIOS PARA TODOS (Público Objetivo) --- */}
        <div className="publico-objetivo">
            <h3>✨ Servicios para Todos</h3>
            <ul className="objetivo-list">
                {publicos.map((item, index) => (
                  <li key={index}>
                    {/* Usamos item.icon dinámicamente. Agregué un margen derecho para separarlo del texto */}
                    <i className={item.icon} style={{ marginRight: '10px' }}></i> 
                    {item.text}
                  </li>
                ))}
            </ul>
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
            
            <img 
              src={bannerImage} 
              alt="Banner" 
              style={{ width: '100%', borderRadius: '10px' }} 
            />

          </div>

        </div>

    </section>
  );
};

export default ServicesSection;