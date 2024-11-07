/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),     // Vue.js support
    legacy({   // Pour le support des navigateurs plus anciens
      targets: ['defaults', 'not IE 11'], // Cible les navigateurs modernes sauf IE11
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias pour le répertoire src
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',  // Pour tester les applications Vue dans un environnement de type DOM
  },
  define: {
    'process.env': {}  // Ajouter ceci pour éviter les problèmes de compatibilité avec certaines bibliothèques
  }
})
