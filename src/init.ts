import path from 'node:path'
import { fileURLToPath } from 'node:url';
// 转换成 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initProcessConfig = (): void => {
  const isConfig = process.argv.find((item) => item.includes('--config') || item.includes('-c'))
  if (!isConfig) {
    process.argv.push('--config', path.resolve(__dirname, "rslib.config.js"))
  }
}

