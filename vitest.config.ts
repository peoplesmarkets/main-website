import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";
import ElementInternalsPolyfill from "element-internals-polyfill";

false && ElementInternalsPolyfill;

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx,jsx}"],
    environment: "jsdom",
    deps: {
      optimizer: { web: { include: [] } },
    },
    threads: false,
    isolate: true,
  },
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
});
