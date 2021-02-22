import chalk from "chalk"
import path from "path"

export const log = {
  info: (...text: string[]) => {
    console.log(chalk.cyan("[info] ", ...text))
  },
  success: (...text: string[]) => {
    console.log(chalk.green("[success] ", ...text))
  },
  warn: (...text: string[]) => {
    console.log(chalk.yellow("[warn] ", ...text))
  },
  error: (...text: string[]) => {
    console.log(chalk.red("[error] ", ...text))
  },
  whispered: (...text: string[]) => {
    console.log(chalk.gray("[whispered] ", ...text))
  },
}

export function resolveUser(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths)
}

export function resolveProject(...paths: string[]) {
  return path.resolve(__dirname, "../", ...paths)
}
