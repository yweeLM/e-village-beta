import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Provide safe defaults so typeof checks work in canvas-less environments
    __firebase_config: 'undefined',
    __app_id: 'undefined',
    __initial_auth_token: 'undefined',
  },
})
