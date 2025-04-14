import path from 'node:path'

export const initProcessConfig = (): void => {
  const isConfig = process.argv.find((item) => item.includes('--config') || item.includes('-c'))
  if (!isConfig) {
    process.argv.push('--config', path.resolve("rslib.config.ts"))
  }
  console.log(process.argv)
}
