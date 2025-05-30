import path from 'node:path'
import { fileURLToPath } from 'node:url';
// 转换成 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initProcessConfig = (): void => {
  const nodeIndex = process.argv.findIndex((item) => item.includes('--node'))
  if (nodeIndex >= 0) {
    process.argv.splice(nodeIndex, 1)
    process.env.CAREFREE_RSLIB_TARGET = 'node'
  } else {
    process.env.CAREFREE_RSLIB_TARGET = 'web'
  }

  const vueIndex = process.argv.findIndex((item) => item.includes('--vue'))

  if (vueIndex >= 0) {
    process.argv.splice(vueIndex, 1)
    process.env.CAREFREE_RSLIB_VUE = 'true'
  } else {
    process.env.CAREFREE_RSLIB_VUE = 'false'
  }

  const esmIndex = process.argv.findIndex((item) => item.includes('--esm'))
  if (esmIndex >= 0) {
    process.argv.splice(esmIndex, 1)
    process.env.CAREFREE_RSLIB_ESM = 'true'
  } else {
    process.env.CAREFREE_RSLIB_ESM = 'false'
  }
  const isConfig = process.argv.find((item) => item.includes('--config') || item.includes('-c'))
  if (!isConfig) {
    process.argv.push('--config', path.resolve(__dirname, "rslib.config.js"))
  }

}

