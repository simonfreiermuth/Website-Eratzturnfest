import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://turnfest.tvzeiningen.ch",
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
});
