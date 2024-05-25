import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'E-commerce App',
        short_name: 'E-commerce',
        description: 'E-commerce PWA By Iaroslav Kukharenko 221-322',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: './assets/images/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/images/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './assets/images/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.tsx',
    css: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/_vars";`,
      },
    },
  },
  resolve: {
    alias: {
      '@styles': '/src/styles',
      '@components': '/src/components',
      '@store': '/src/store',
      '@config': '/src/config',
      '@assets': '/src/assets',
    },
  },
});
