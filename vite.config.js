import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Three.js + ShaderGradient : chunk séparé, chargé en lazy via l'opener
          if (
            id.includes('/three/') ||
            id.includes('/three-stdlib/') ||
            id.includes('/@react-three/') ||
            id.includes('/@shadergradient/') ||
            id.includes('/camera-controls/')
          ) {
            return 'vendor-three'
          }

          // React core — stable, mis en cache longtemps
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/')
          ) {
            return 'vendor-react'
          }

          // Animejs — utilisé uniquement dans MarsIA et At-Ifit
          if (id.includes('/animejs/')) {
            return 'vendor-anim'
          }

          // Reste des node_modules
          return 'vendor'
        }
      }
    },
    // Augmenter la limite d'avertissement (Three.js est gros par nature)
    chunkSizeWarningLimit: 600
  }
})
