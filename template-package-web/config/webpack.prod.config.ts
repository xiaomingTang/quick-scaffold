import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import { CleanWebpackPlugin } from "clean-webpack-plugin"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"

import Paths from "./paths"

const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    index: path.resolve(Paths.Src, "main/index.ts"),
  },
  output: {
    path: Paths.Dist,
    filename: "[name].min.js",
    library: "<%= scaffoldConfig.projectName %>",
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
