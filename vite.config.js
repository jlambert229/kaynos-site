import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Build-only chunk; strip preload hints after prerender so browsers do not fetch it. */
function stripPrerenderModulePreload() {
  return {
    name: "strip-prerender-modulepreload",
    enforce: "post",
    generateBundle(_opts, bundle) {
      const re =
        /<link rel="modulepreload"[^>]*href="\/assets\/prerender-[^"]+"[^>]*>\s*/g;
      for (const asset of Object.values(bundle)) {
        if (
          asset.type === "asset" &&
          asset.fileName?.endsWith(".html") &&
          typeof asset.source === "string"
        ) {
          asset.source = asset.source.replace(re, "");
        }
      }
    },
  };
}

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.jsx"),
      additionalPrerenderRoutes: ["/privacy", "/data-use", "/getting-started", "/contact", "/changelog", "/accessibility", "/for/students", "/for/coaches", "/security"],
    }),
    stripPrerenderModulePreload(),
  ],
  build: {
    outDir: "dist",
  },
});
