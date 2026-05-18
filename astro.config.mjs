import { defineConfig } from "astro/config";

// When deploying to a project page on GitHub Pages, override `base`
// via the GH_PAGES_BASE env var, e.g. GH_PAGES_BASE=/turnfest-website/.
// For user/organisation pages or a custom domain leave it as "/".
const base = process.env.GH_PAGES_BASE ?? "/";

export default defineConfig({
  site: "https://example.invalid",
  base,
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
});
