import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3001 },
  resolve: {
    alias: {
      // Map 'src' to the absolute path of your 'src' directory
      'src': path.resolve(__dirname, './src'),
    }
  }
})
