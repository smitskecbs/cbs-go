import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  base: "/cbs-go/",

  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],

      // ✅ FIX: allow bigger bundles in precache during our test
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6MB
      },

      manifest: {
        name: "CBS GO",
        short_name: "CBS GO",
        start_url: "/cbs-go/",
        scope: "/cbs-go/",
        display: "standalone",
        background_color: "#05070b",
        theme_color: "#000000",
        icons: [
          { src: "/cbs-go/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/cbs-go/pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],

  define: {
    global: "globalThis",
  },

  build: {
    // ✅ TEST: turn off minify to see if "Ne is not defined" disappears
    minify: false,

    target: "es2019",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ["maplibre-gl"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["maplibre-gl"],
  },
});
