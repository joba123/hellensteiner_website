import { resolve } from "node:path";
import { cpSync, existsSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-static-image-assets",
      closeBundle() {
        const source = resolve(__dirname, "assets", "images");
        const target = resolve(__dirname, "dist", "assets", "images");

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
        index: resolve(__dirname, "index.html"),
        historie: resolve(__dirname, "pages", "historie.html"),
        biergarten: resolve(__dirname, "pages", "biergarten.html")
      }
    }
  }
});
