import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { createHtmlPlugin } from "vite-plugin-html";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: { enabled: true },
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
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
  ],
  css: {
    preprocessorOptions: {
      scss: {
        purgecss: {
          content: [
            "./index.html",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
          ],
        },
      },
      css: {
        purgecss: {
          content: [
            "./index.html",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
          ],
        },
      },
      tailwindcss: {
        purgecss: {
          content: [
            "./index.html",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
          ],
        },
      },
    },
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production" ? [cssnano()] : []),
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
      output: {
        // Use a more efficient format for chunks
        format: "esm",
        sourcemap: false,
      },
    },
    target: "esnext",
    minify: "terser",
    cssMinify: true,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
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
