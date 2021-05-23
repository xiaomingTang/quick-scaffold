import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import { CleanWebpackPlugin } from "clean-webpack-plugin"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"
import { convertToPascalCase } from "./utils"

import Paths from "./paths"
import { appName } from "./constants"

const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    index: path.resolve(Paths.Src, "index.ts"),
  },
  externals: {},
  output: {
    path: Paths.DistUmd,
    filename: "[name].js",
    library: convertToPascalCase(appName),
    libraryTarget: "umd",
  },
  plugins: [
    ...commonWebpackConfig.plugins,
    // 该版本类型暂未适配 webpack@5
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      // cleanOnceBeforeBuildPatterns: [
      //   "*.js",
      // ],
    }) as unknown as webpack.Plugin,
  ],
  optimization,
})

export default prodWebpackConfig
