/**
 * key and value 必须全部为 string, 不得为 number 或其他类型
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * 警告!!! 你不应在 src/ 目录下访问此处定义的环境变量, 因为 src/ 目录下的内容将会打包为 npm 包, 使用者的环境下不一定会存在该环境变量
 *
 * 你可以额外在该文件所在目录下新建 .env.local.ts 文件, 用于添加本地的环境配置
 *
 * 该配置所添加的 key value 将在 /config 以及 /examples 内的 js/ts 文件能被访问( process.env[key] === value )
 *
 * 如果有自定义项, 可以在 .env.local.ts 中添加自定义项( .env.local.ts 文件应当是本地配置, 不应当添加到 git 版本管理 )
 *
 * ```
 * import { envConfig as publicEnvConfig, EnvConfig } from "./env"
 *
 * export const envConfig: EnvConfig = {
 *   ...publicEnvConfig,
 *   CUSTOM_VAR: "custom value",
 * }
 * ```
 *
 * 例如下面的示例代码, 你将能访问 process.env.SCAFFOLD_CONFIG_APP_NAME, 其值为 "<%= scaffoldConfig.projectName %>"
 */
export const envConfig: EnvConfig = {
  SCAFFOLD_CONFIG_APP_NAME: "<%= scaffoldConfig.projectName %>",
}
