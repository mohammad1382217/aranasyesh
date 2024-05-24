import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

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
    viteCompression({
      threshold: 10240,
      algorithm: "gzip",
    }),
    visualizer(),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
    modulePreload: {
      resolveDependencies: (url, deps, context) => {
        return [];
      },
    },
    rollupOptions: {
      output: {
        sourcemap: false,
        // manualChunks: {
        //   react: ["react", "react-dom"],
        //   router: ["react-router-dom"],
        //   materialTailwind: ["@material-tailwind/react"],
        //   flowbiteReact: ["flowbite-react"],
        //   axios: ["axios"],
        //   recharts: ["recharts"],
        //   // سایر کتابخانه‌های بزرگ در صورت نیاز
        // },
      },
    },
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"], // حذف console.log
        unused: true,
        dead_code: true,
      },
    },
  },
});
