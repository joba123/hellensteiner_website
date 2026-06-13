import { resolve } from "node:path";
import { readdirSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pageInputs = Object.fromEntries(
  readdirSync(resolve(__dirname, "pages"))
    .filter((fileName) => fileName.endsWith(".html"))
    .map((fileName) => [
      `page-${fileName.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
      resolve(__dirname, "pages", fileName)
    ])
);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        ...pageInputs
      }
    }
  }
});
