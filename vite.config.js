import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      // Cambiamos 'filter' por 'include' (usa un array para archivos jsx/tsx)
      include: [/\.(jsx|tsx)$/],
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
  ],
  build: {
    // 1. Ajuste del límite de advertencia (1000kb = 1MB)
    chunkSizeWarningLimit: 1000,

    // 2. Estrategia de optimización de archivos (Code Splitting)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa las librerías grandes (node_modules) en un archivo separado
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
