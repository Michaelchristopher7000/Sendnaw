import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://sendnawbackend.onrender.com',
        changeOrigin: true,
        // keep the `/api` prefix so backend paths like /api/transfers/... resolve
        rewrite: (path) => path
      }
    }
  }
})