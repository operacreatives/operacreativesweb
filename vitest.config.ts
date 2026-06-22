import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: { "@": rootDir },
  },
  test: {
    environment: "jsdom",
    setupFiles: [path.resolve(rootDir, "tests/setup.ts")],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
