import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { transformWithOxc } from "vite";

export default defineConfig({
  plugins: [
    // Vite 6 uses OXC which doesn't parse JSX in .js files by default.
    // Pre-transform project .js files with esbuild (jsx loader) so OXC
    // never sees raw JSX.
    {
      name: "js-jsx-loader",
      enforce: "pre",
      async transform(code, id) {
        if (id.endsWith(".js") && !id.includes("node_modules")) {
          return transformWithOxc(code, id, { lang: "jsx" });
        }
      },
    },
    react(),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
  },
});
