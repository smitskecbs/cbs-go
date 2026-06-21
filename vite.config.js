import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(() => {
  const buildTarget = process.env.BUILD_TARGET || "web";
  const isAndroid = buildTarget === "android";

  return {
    base: isAndroid ? "./" : "/cbs-go/",

    plugins: [
      nodePolyfills({
        protocolImports: true,
      }),

      VitePWA({
        registerType: "prompt",
        // Single registration path: virtual:pwa-register in src/main.js (no injected registerSW.js).
        injectRegister: null,

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
          start_url: isAndroid ? "./" : "/cbs-go/",
          scope: isAndroid ? "./" : "/cbs-go/",
          display: "standalone",
          background_color: "#05070b",
          theme_color: "#000000",
          icons: [
            {
              src: isAndroid ? "icons/icon-192.png" : "/cbs-go/icons/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: isAndroid ? "icons/icon-512.png" : "/cbs-go/icons/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },

        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        },
      }),
    ],

    define: {
      global: "globalThis",
    },

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
  };
});