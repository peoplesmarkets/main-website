import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    deps: {
      optimizer: {
        web: {
          include: [],
        },
      },
    },
    threads: false,
    isolate: true,
  },
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
});
