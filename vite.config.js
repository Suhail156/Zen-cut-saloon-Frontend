import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/styles'],
  },
  build: {
    outDir: 'build', // Specify the output directory
    rollupOptions: {
      external: [], // Make sure axios is not listed here
    },
  },
});
