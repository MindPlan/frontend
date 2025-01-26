import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteAliases } from 'vite-aliases';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases()],
  base: '/frontend/',
  define: {
    'process.env.VITE_CLIENT_ID': JSON.stringify(process.env.VITE_CLIENT_ID),
  }
})
