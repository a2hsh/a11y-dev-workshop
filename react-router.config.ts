import type { Config } from "@react-router/dev/config";


export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Explicitly set basename for GitHub Pages
  basename: process.env.NODE_ENV === "production" ? "/a11y-dev-workshop/" : "/",
} satisfies Config;
