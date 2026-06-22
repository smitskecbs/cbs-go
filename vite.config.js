import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { nodePolyfills } from "vite-plugin-node-polyfills";

/**
 * Web deploy base path.
 * - Default `/` (Vercel, custom domain root)
 * - GitHub Pages: set VITE_BASE_PATH=/cbs-go/
 */
function resolveWebBase() {
  const raw = process.env.VITE_BASE_PATH;
  if (raw === undefined || raw === null || String(raw).trim() === "") {
    return "/";
  }

  let base = String(raw).trim();
  if (base === "." || base === "./") return "./";
  if (!base.startsWith("/")) base = `/${base}`;
  if (base !== "/" && !base.endsWith("/")) base = `${base}/`;
  return base;
}

/** Join base + asset path (icons, manifest URLs). */
function withBase(base, assetPath) {
  const clean = String(assetPath || "").replace(/^\//, "");
  if (base === "./") return clean;
  if (base === "/") return `/${clean}`;
  return `${base}${clean}`;
}

export default defineConfig(() => {
  const buildTarget = process.env.BUILD_TARGET || "web";
  const isAndroid = buildTarget === "android";
  const webBase = resolveWebBase();
  const base = isAndroid ? "./" : webBase;
  const pwaScope = isAndroid ? "./" : webBase;

  return {
    base,

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
          // Root deploy — go.cbs-coin.com (scope /)
          id: pwaScope,
          start_url: pwaScope,
          scope: pwaScope,
          display: "standalone",
          background_color: "#0a1228",
          theme_color: "#0a1228",
          icons: [
            {
              src: withBase(base, "icons/icon-192.png"),
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: withBase(base, "icons/icon-512.png"),
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },

        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: false,
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
              handler: 'NetworkOnly',
              method: 'GET',
              options: {
                cacheName: 'cbsgo-api-bypass',
              },
            },
          ],
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
