/**
 * key and value 必须全部为 string, 不得为 number 或其他类型
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * 你可以额外在该文件所在目录下新建 .env.local.ts 文件, 用于添加本地的环境配置
 * 
 * 该配置所添加的 key value 将在 /config 以及 /src 内的 js/ts 文件中可以访问( process.env[key] === value )
 * 
 * 例如下面的示例代码, 你将能访问 process.env.APP_NAME, 其值为 "<%= scaffoldConfig.projectName %>"
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
 * 如果没有, 就将下面这个对象原样导出
 * 
 * ```
 * export { envConfig } from "./env"
 * ```
 */
export const envConfig: EnvConfig = {
  APP_NAME: "<%= scaffoldConfig.projectName %>",
}
