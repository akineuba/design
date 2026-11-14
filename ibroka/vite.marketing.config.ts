import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Builds the marketing home page (marketing/index.html) as a static site in marketing-dist/.
export default defineConfig({
  root: resolve(__dirname, 'marketing'),
  publicDir: resolve(__dirname, 'public'),
  base: './',
  plugins: [react()],
  css: { postcss: resolve(__dirname, 'postcss.config.cjs') },
  build: { outDir: resolve(__dirname, 'marketing-dist'), emptyOutDir: true },
});
