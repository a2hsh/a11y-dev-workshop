import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
// base depends on environment, cause GitHub Pages uses a subpath
  base: process.env.NODE_ENV === "production" ? "/a11y-dev-workshop/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
