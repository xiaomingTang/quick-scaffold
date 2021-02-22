import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import { log } from "./utils"
import Paths from "./paths"
import { isProduction, appName } from "./Constants"
import { resolve, rules } from "./common-loaders"
import { EnvConfig } from "./.env"

let envConfig: EnvConfig

try {
  // 可以不存在 .env.local 文件
  envConfig = require("./.env.local").envConfig
  log.success("将注入 .env.local.ts 内的环境变量")
} catch (error) {
  envConfig = require("./.env").envConfig
  log.warn(".env.local.ts 文件不存在, 或未导出 envConfig 变量; 将注入 .env.ts 内的环境变量")
}

const definePluginOption: Record<string, string> = Object.entries(envConfig).reduce((prev, [key, val]) => {
  prev[`process.env.${key}`] = JSON.stringify(val)
  return prev
}, {})

const commonWebpackConfig: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "inline-cheap-module-source-map",
  // 使输出更精简
  stats: "errors-warnings",
  entry: {
    // HtmlWebpackPlugin.Options.chunks 需要跟着 entry 一起改动, 指出该 HtmlWebpackPlugin 需要的 chunks.
    index: ["react-hot-loader/patch", path.resolve(Paths.Src, "index.tsx")],
  },
  output: {
    // 许多插件依赖 publicPath, 且如果为空("" 或 undefined), webpack 会将该参数默认值设置为 "auto" (尤其丧心病狂地, 它竟然不是 "auto/"), 导致一系列的 bug
    // 单纯我碰上的就有 webpack-pwa-manifest, workbox-webpack-plugin 这两个插件因此存在 bug
    // 所以 publicPath 参数一定要设置
    // 别用 ".", 例如像 workbox-webpack-plugin, 路径拼接时不是使用的 path.join, 而是 arr.join(""), 丧心病狂... 导致会出现形如 .manifest/xxx 这样的路径
    // 所以不管什么路径, 都记得在结尾添加 "/"
    // 开发环境用 "./" 貌似会出错, 导致 index.html 都打不开, 估计又是路径拼接的问题(估计没使用 path.join, 而是用的其他的方法), 所以开发环境要使用 "/"
    publicPath: isProduction ? "./" : "/",
    path: Paths.Dist,
    filename: "static/scripts/[name].[hash:5].js",
    chunkFilename: isProduction
      ? "static/scripts/chunk-[name].[hash:5].js"
      : "static/scripts/chunk-[name].js"
  },
  resolve,
  module: {
    rules,
  },
  plugins: [
    // 该版本类型暂未适配 webpack@5
    new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: `index.html`,
      title: appName,
      inject: "body",
      chunks: ["index"],
      favicon: path.join(Paths.Public, "favicon.ico"),
      // hash: true, // 不 hash
    }) as unknown as webpack.Plugin,
    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/,
    ]),
    new webpack.ProgressPlugin({
      modules: true,
    }),
    new webpack.DefinePlugin(definePluginOption),
  ],
}

export default commonWebpackConfig
