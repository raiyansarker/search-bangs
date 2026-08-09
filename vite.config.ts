import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Search",
        short_name: "Search",
        description: "Fast browser search with built-in DuckDuckGo bang shortcuts",
        theme_color: "#fafafa",
        background_color: "#fafafa",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/search.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});

