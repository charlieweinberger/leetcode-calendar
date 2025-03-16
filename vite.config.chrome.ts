import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import baseConfig, { baseManifest, baseBuildOptions } from "./vite.config.base";
import { crx } from "@crxjs/vite-plugin";

const outDir = resolve(__dirname, "dist_chrome");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: baseManifest,
        browser: "chrome",
      }),
    ],
    build: {
      ...baseBuildOptions,
      outDir
    },
  })
)