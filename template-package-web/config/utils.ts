import chalk from "chalk"

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

export function convertToPascalCase(name: string): string {
  return name.replace(/(-|_|^)(\w)/g, (match, p1: string, p2: string) => {
    return p2.toUpperCase()
  })
}
