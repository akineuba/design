import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ds = fileURLToPath(new URL('../wCRM-marketing-design-system/src', import.meta.url));

// The design system is consumed from source (sibling folder), so its bare imports
// (React, Radix, clsx) must resolve to this app's node_modules: `dedupe` does that.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@ds$/, replacement: `${ds}/index.ts` },
      { find: /^@ds\//, replacement: `${ds}/` },
    ],
    dedupe: [
      'react',
      'react-dom',
      'clsx',
      '@radix-ui/react-accordion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
    ],
  },
  server: { fs: { allow: ['..'] } },
});
