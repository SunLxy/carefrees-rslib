import type { RsbuildPlugin } from '@rsbuild/core';
import { spawn } from "node:child_process"

export const pluginVueTs = (): RsbuildPlugin => {
  return {
    name: 'plugin-vue-ts',
    setup(api) {
      api.onAfterBuild(() => {
        try {
          spawn("vue-ts", { cwd: process.cwd() })
        } catch (error) {
          console.error("vue-ts", error)
        }
      })
    },
  };
}