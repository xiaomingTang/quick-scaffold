import chalk from "chalk"

export const log = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  info: (...text: any[]): void => {
    console.log(chalk.cyan("[info] ", ...text))
  },
  success: (...text: any[]): void => {
    console.log(chalk.green("[success] ", ...text))
  },
  warn: (...text: any[]): void => {
    console.log(chalk.yellow("[warn] ", ...text))
  },
  error: (...text: any[]): void => {
    console.log(chalk.red("[error] ", ...text))
  },
  whispered: (...text: any[]): void => {
    console.log(chalk.gray("[whispered] ", ...text))
  },
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
