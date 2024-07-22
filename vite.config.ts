import cssnano from "cssnano";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: { enabled: true },
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt", "masked-icon.svg"],
  manifest: {
    name: "آران اسایش آفرینان",
    short_name: "آران اسایش",
    description: "آران اسایش آفرینان یک وب اپلیکیشن است.",
    theme_color: "#171717",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === "document",
        handler: "NetworkFirst",
        options: {
          cacheName: "html-cache",
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24, // 1 day
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "script",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "js-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "style",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "css-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "font",
        handler: "CacheFirst",
        options: {
          cacheName: "font-cache",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: new RegExp('https://api\\.aranasayesh\\.ir/.*'),
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn),
    mkcert(),
    visualizer(),
    createHtmlPlugin({
      minify: true,
    }),
    Pages({
      dirs: "./app", // پوشه‌ای که شامل فایل‌های صفحات شماست
      extensions: ["jsx", "tsx"],
    }),
    sitemap({
      hostname: "https://aranasayesh.ir", // آدرس سایت خود را وارد کنید
      outDir: "dist", // اطمینان از ساخت نقشه سایت در پوشه dist برای محیط production
    }),
    purgeCss(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production" ? [cssnano] : []),
      ],
    },
  },
  resolve: {
    alias: {
      // اضافه کردن مسیر فونت به alias
      "/font": "/public/font",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    modulePreload: true,
    rollupOptions: {
      treeshake: true,
      output: {
        // Use a more efficient format for chunks
        format: "esm",
        sourcemap: false,
      },
    },
    target: "esnext",
    minify: "terser",
    cssMinify: "lightningcss",
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        side_effects: false,
        unused: true,
        dead_code: true,
        module: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"], // حذف console.log
      },
    },
  },
});
