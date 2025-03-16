import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { ManifestV3Export } from '@crxjs/vite-plugin';
import baseConfig, { baseManifest, baseBuildOptions } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_firefox");

const firefoxManifest = {
  ...baseManifest,
  "chrome_settings_overrides": {
    "homepage": "src/index.html"
  },
} as ManifestV3Export

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: firefoxManifest,
        browser: "firefox",
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir
    },
    publicDir: resolve(__dirname, "public"),
  })
)
