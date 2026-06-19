import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': { // Cuando la solicitud en el frontend empiece con /api
        target: 'http://localhost:5000', // Redirígela al backend en el puerto 5000
        changeOrigin: true, // Importante para que el host de la solicitud sea el del backend
        secure: false, // Desactiva la verificación SSL para desarrollo si es necesario
        // rewrite: (path) => path.replace(/^\/api/, ''), // Esto no es necesario si las rutas del backend ya incluyen /api
      },
    },
  },
});
