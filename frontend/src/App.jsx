// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa todos los componentes de tu página principal
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import AgendarCitaPage from './pages/AgendarCitaPage';
import RegisterPage from './pages/Auth/RegisterPage'; 
import LoginPage from './pages/Auth/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import PatientManagementPage from './pages/PatientManagementPage';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';

function App() {
  return (
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            
            <Route path="/" element={
              <div className="blue-section-wrapper">
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <ContactSection />
              </div>
            } />

            
            <Route path="/agendar-cita" element={<AgendarCitaPage />} /> 
            
            {/* RUTA DE REGISTRO - AHORA PROTEGIDA (SOLO ADMIN) 
              <Route
                 path="/register"
                   element={
             <PrivateRoute allowedRoles={['admin']}>
              <RegisterPage />
              </PrivateRoute>
          }
          />
          */}

          <Route path="/register" element={<RegisterPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />


            {/* --- Ruta Protegida para Gestión de Pacientes --- */}
          {/* Solo accesible para roles 'admin' y 'therapist' */}
          <Route
            path="/patients" 
            element={
              <PrivateRoute allowedRoles={['admin', 'therapist']}> {/* <-- Protege con roles! */}
                <PatientManagementPage />
              </PrivateRoute>
            }
          />
          {/* ------------------------------------- */}


          {/* --- NUEVA RUTA: Lista de Pacientes --- */}
          {/* También protegida y solo accesible para roles 'admin' y 'therapist' */}
          <Route
            path="/patients/list" // <-- ¡NUEVA RUTA! Puedes acceder a esta URL para ver la lista
            element={
              <PrivateRoute allowedRoles={['admin', 'therapist']}>
                <PatientList /> {/* <-- Aquí se renderiza el componente PatientList */}
              </PrivateRoute>
            }
          />
          {/* ------------------------------------- */}




          {/* --- NUEVAS RUTAS: Añadir y Editar Paciente --- */}
          {/* Ruta para añadir un nuevo Paciente */}
          <Route
            path="/patients/add" 
            element={
              <PrivateRoute allowedRoles={['admin', 'therapist']}>
                <PatientForm />
              </PrivateRoute>
            }
          />
          {/* Ruta para editar un Paciente existente (con ID en la URL) */}
          <Route
            path="/patients/edit/:id" 
            element={
              <PrivateRoute allowedRoles={['admin', 'therapist']}>
                <PatientForm />
              </PrivateRoute>
            }
          />
          {/* ------------------------------------- */}



          </Routes>
        </main>

        <Footer />
        <WhatsAppBtn />
      </div>
    
  );
}

export default App;