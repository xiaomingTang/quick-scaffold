import webpack from "webpack"
import path from "path"

import { resolve, rules } from "./common-loaders"
import Paths from "./paths"
import {
  isProduction, externals,
} from "./constants"
import { getEnvConfig } from "./utils"

type OptionItem = Record<string, string>

const definePluginOption: OptionItem = Object.entries(getEnvConfig()).reduce((prev, [key, val]) => ({
  ...prev,
  [`process.env.${key}`]: JSON.stringify(val),
}), ({} as OptionItem))

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "inline-cheap-module-source-map",
  entry: {
    index: ["react-hot-loader/patch", path.resolve(Paths.Src, "index.tsx")],
  },
  // 使输出更精简
  stats: "errors-warnings",
  // externals 应当在/config/constants.js文件中声明, 不建议在此修改配置逻辑
  externals: isProduction ? externals : {},
  output: {
    publicPath: isProduction ? "./" : "/",
    path: Paths.Dist,
    filename: "packages/scripts/[name].js",
    chunkFilename: "packages/scripts/chunk-[name].js",
    libraryTarget: "umd",
  },
  resolve,
  module: {
    rules,
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/,
    ]),
    new webpack.ProgressPlugin({
      activeModules: false,
    }),
    new webpack.DefinePlugin(definePluginOption),
  ].filter(Boolean),
}

export default config
