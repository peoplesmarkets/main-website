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
          lodash: ["lodash"],
        },
      },
    },
  },
});
