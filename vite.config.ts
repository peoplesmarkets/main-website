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
          i18next: [
            "i18next",
            "i18next-browser-languagedetector",
            "@mbarzda/solid-i18next",
          ],
          "markdown-it": ["markdown-it"],
          "markdown-it-image-figures": ["markdown-it-image-figures"],
          "markdown-it-link-attributes": ["markdown-it-link-attributes"],
          "@material/web": [
            "@material/web/tabs/tabs",
            "@material/web/tabs/primary-tab",
            "@material/web/tabs/secondary-tab",
            "@material/web/button/elevated-button",
            "@material/web/button/filled-button",
            "@material/web/button/filled-tonal-button",
            "@material/web/button/outlined-button",
            "@material/web/button/text-button",
            "@material/web/fab/fab",
            "@material/web/fab/branded-fab",
            "@material/web/textfield/outlined-text-field",
            "@material/web/dialog/dialog",
            "@material/web/progress/circular-progress",
          ],
        },
      },
    },
  },
});
