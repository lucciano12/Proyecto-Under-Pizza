import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rótulos QR Scanner',
        short_name: 'RotulosQR',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
      }
    })
  ],
  optimizeDeps: {
    include: ['@rotulos/shared'],
  },
  build: {
    commonjsOptions: {
      include: [/shared/, /node_modules/],
    },
  },
})
