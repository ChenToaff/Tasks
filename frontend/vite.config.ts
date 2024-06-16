import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

let proxyConfig = {};
if (process.env.NODE_ENV === "development") {
  if (!process.env.API_PROXY) {
    throw new Error(
      "API_PROXY environment variable is required for development"
    );
  }

  proxyConfig = {
    "/api": {
      target: process.env.API_PROXY,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
    "/socket.io": {
      target: process.env.API_PROXY,
      ws: true,
    },
  };
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyConfig,
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
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
