import { resolve } from 'path';
import { mergeConfig, defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import baseConfig, { baseManifest, baseBuildOptions } from './vite.config.base'

const outDir = resolve(__dirname, 'dist_chrome');

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: baseManifest,
        browser: 'chrome',
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir
    },
  })
)