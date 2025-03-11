import { resolve } from 'path';
import { mergeConfig, defineConfig } from 'vite';
import baseConfig, { baseManifest, baseBuildOptions } from './vite.config.base';
import { crx } from '@crxjs/vite-plugin';
import { VitePluginRadar } from 'vite-plugin-radar';

const outDir = resolve(__dirname, 'dist_chrome');

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: baseManifest,
        browser: 'chrome',
      }),
      VitePluginRadar({
        analytics: {
          id: "G-DMLCPS92H2",
        },
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir
    },
  })
)