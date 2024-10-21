import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            // Ajouter toutes les balises A-Frame que tu utilises
            return ['a-scene', 'a-camera', 'a-entity', 'a-box', 'a-sphere', 'a-cylinder', 'a-plane', 'a-sky', 'a-assets'].includes(tag);
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
