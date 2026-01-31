import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // PENTING: Jika deploy ke https://username.github.io/nama-repo/,
  // ubah base menjadi '/nama-repo/'.
  // Jika deploy ke domain sendiri (misal cctv.domainku.com), biarkan '/'
  base: '/', 
  server: {
    port: 3000,
    host: '0.0.0.0', 
  }
});