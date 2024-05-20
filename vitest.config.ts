import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
