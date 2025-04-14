import { defineConfig } from '@rslib/core';
export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
    define: {
      RSLIB_VERSION: JSON.stringify(require('./package.json').version),
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
});
