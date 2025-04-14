
import path from 'path'

console.log(process.argv)
const isConfig = process.argv.find((item) => item.includes('--config') || item.includes('-c'))
console.log(isConfig)
if (!isConfig) {
  console.log(path.resolve("a.config.ts"))
  process.argv.push('--config', 'rslib.config.ts')
}
console.log(process.argv)