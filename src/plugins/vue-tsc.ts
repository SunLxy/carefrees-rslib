import type { RsbuildPlugin } from '@rsbuild/core';
import { spawn } from 'child_process'

export const pluginVueTsc = (): RsbuildPlugin => {
  return {
    name: 'plugin-vue-tsc',
    setup(api) {
      api.onAfterBuild(() => {
        try {
          spawn("vue-tsc")
        } catch (error) {
          console.error("vue-tsc", error)
        }
      })
    },
  };
}