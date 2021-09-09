import chalk from "chalk"
import { EnvConfig } from "./.env"

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
  return name.replace(/(@|\/|-|_|^)(\w)/g, (match, p1: string, p2: string) => {
    return p2.toUpperCase()
  })
}

export function getEnvConfig(): EnvConfig {
  let envConfig: EnvConfig

  try {
    // 可以不存在 .env.local 文件
    envConfig = require("./.env.local").envConfig
    log.success("将注入 .env.local.ts 内的环境变量")
  } catch (error) {
    envConfig = require("./.env").envConfig
    log.warn(".env.local.ts 文件不存在, 或未导出 envConfig 变量; 将注入 .env.ts 内的环境变量")
  }

  const errors: string[] = []

  Object.entries(envConfig).forEach(([key, val]) => {
    if (typeof val !== "string") {
      errors.push(`envConfig.${key} must be string, not "${typeof val}"`)
    }
  })

  if (errors.length > 0) {
    log.error(errors.join("\n"))
    throw new Error("wrong envConfig")
  }

  return envConfig
}

export function isMeansTrue(input: string | undefined | null, strict = false): boolean {
  if (strict) {
    return input === "true"
  }
  return ["true", "1"].includes((input || "").toLocaleLowerCase())
}
