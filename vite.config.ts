import { resolve } from "node:path";
import { cpSync, existsSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-converted-image-assets",
      closeBundle() {
        const source = resolve(__dirname, "assets", "images_converted");
        const target = resolve(__dirname, "dist", "assets", "images_converted");

        if (existsSync(source)) {
          cpSync(source, target, { recursive: true });
        }
      }
    }
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html")
      }
    }
  }
});
