import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100, 
    },
    // This ensures the HMR websocket connects correctly
    hmr: {
      overlay: true, 
    },
    // Force Vite to check for changes more aggressively
    strictPort: true, 
  }
})
