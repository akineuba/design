import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build: ES module bundle plus one stylesheet. React stays a peer dependency.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { assetFileNames: 'style.css' },
    },
  },
});
