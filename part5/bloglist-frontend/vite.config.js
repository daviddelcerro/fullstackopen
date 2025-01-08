/* eslint-disable linebreak-style */
/* eslint-disable quotes */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test : {
    environment : 'jsdom',
    globals : true,
    setupFiles : './testSetup.js',
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
      },
    },
  },

})
