import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin({
      exclude: ["service-apis", "zitadel"],
    }),
  ],
  server: {
    port: 8000,
  },
  build: {
    target: "esnext",
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "solid-js": ["solid-js"],
          "@solidjs/router": ["@solidjs/router"],
          lodash: ["lodash"],
          axios: ["axios"],
          i18next: ["i18next"],
          "i18next-browser-languagedetector": [
            "i18next-browser-languagedetector",
          ],
          "@mbarzda/solid-i18next": ["@mbarzda/solid-i18next"],
          "markdown-it": ["markdown-it"],
          "markdown-it-image-figures": ["markdown-it-image-figures"],
          "markdown-it-link-attributes": ["markdown-it-link-attributes"],
        },
      },
    },
  },
});
