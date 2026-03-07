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

      // assets uit /public (relatief pad, NIET met /cbs-go/ ervoor)
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],

      manifest: {
        name: "CBS GO",
        short_name: "CBS GO",
        start_url: "/cbs-go/",
        scope: "/cbs-go/",
        display: "standalone",
        background_color: "#05070b",
        theme_color: "#000000",
        icons: [
          { src: "/cbs-go/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/cbs-go/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },

      workbox: {
        // allow >2MB files in precache (jij had 2.25MB bundle)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
    }),
  ],

  define: {
    global: "globalThis",
  },

  // FIX voor "__publicField is not defined" in production bundles
  esbuild: {
    target: "es2022",
  },

  build: {
    target: "es2022",
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
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
    esbuildOptions: {
      target: "es2022",
    },
  },
});
