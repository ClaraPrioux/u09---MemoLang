import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import manifest from "./public/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: manifest,
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,svg,png,webp}"],
        },
      }),
    ],
  };
});
