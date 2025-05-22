import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig, RslibConfig } from '@rslib/core';
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue';
import { pluginVueTs } from "./plugins/vue-ts"


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
      pluginVueTs()
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
    plugins,
  } as RslibConfig;
});
