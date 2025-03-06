import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest, baseBuildOptions } from "./vite.config.base"

const outDir = resolve(__dirname, "dist_firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: baseManifest,
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
