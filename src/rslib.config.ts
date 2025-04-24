import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig, RslibConfig } from '@rslib/core';
export default defineConfig(() => {
  const isNode = process.env.CAREFREE_RSLIB_TARGET === 'node'
  const isOnlyESM = process.env.CAREFREE_RSLIB_ESM === 'true'

  return {
    source: {
      entry: {
        index: ['./src/**', '!src/**/*.md'],
      },
    },
    lib: [
      {
        bundle: false,
        dts: true,
        format: 'esm',
        output: {
          filename: {
            js: '[name].js',
          },
          distPath: {
            root: './esm',
          },
        },
      },
      isOnlyESM ? undefined : {
        bundle: false,
        dts: true,
        format: 'cjs',
        output: {
          filename: {
            js: '[name].js',
          },
          distPath: {
            root: './lib',
          },
        },
      },
    ].filter(Boolean),
    output: {
      target: isNode ? "node" : 'web',
    },
    plugins: isNode ? [] : [
      pluginReact(),
      pluginSvgr({
        mixedImport: true,
        svgrOptions: { exportType: 'named', },
      })],
  } as RslibConfig;
});
