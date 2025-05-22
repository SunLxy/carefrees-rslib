import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig, RslibConfig } from '@rslib/core';
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue';
import { pluginVueTsc } from "./plugins/vue-tsc"

export default defineConfig(() => {
  const isNode = process.env.CAREFREE_RSLIB_TARGET === 'node'
  const isOnlyESM = process.env.CAREFREE_RSLIB_ESM === 'true'
  const isVue = process.env.CAREFREE_RSLIB_VUE === 'true'
  let plugins = isNode ? [] : [
    pluginReact(),
    pluginSvgr({
      mixedImport: true,
      svgrOptions: { exportType: 'named', },
    })]
  if (isVue) {
    plugins = [
      pluginUnpluginVue({}),
      pluginVueTsc()
    ]
  }
  return {
    source: {
      entry: {
        index: ['./src/**', '!src/**/*.md'],
      },
    },
    lib: [
      {
        bundle: false,
        dts: isVue ? false : true,
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
        dts: isVue ? false : true,
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
    plugins,
  } as RslibConfig;
});
