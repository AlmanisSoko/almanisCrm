// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed || {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'import.meta.env': env,
  },
});

