import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true, // Remove debugger statements
      },
      mangle: true, // Shorten variable names
    },
    lib: {
      name: "figma-comparision-script",
      entry: {
        "figma-comparision-script": resolve(__dirname, "src/index.ts"),
        // myComponent: resolve(__dirname, "src/react.tsx"),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
  },
});
