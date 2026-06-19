import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React Compiler ya está integrado en el plugin de react,
      // pero puedes asegurarte de que babel solo toque lo necesario
    }),
    babel({
      // 1. Limita el filtro solo a tus archivos de código fuente
      filter: /\.(jsx|tsx)$/,
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
