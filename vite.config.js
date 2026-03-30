import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Eco-Pulse-3D-Dashboard/',
  define: {
    'process.env': {} 
  }
})
