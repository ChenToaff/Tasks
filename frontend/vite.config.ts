import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: "http://localhost:5000",
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@customTypes": path.resolve(__dirname, "./src/types"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
