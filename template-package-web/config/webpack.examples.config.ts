import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"

import Paths from "./paths"
import { appName } from "./Constants"

const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    examples: path.resolve(Paths.Src, "examples/index.tsx"),
  },
  externals: {},
  output: {
    path: Paths.DistExample,
    filename: "[name].js",
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
    // 该版本类型暂未适配 webpack@5
    new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "examples.html"),
      filename: "examples.html",
      title: appName,
      inject: "body",
      chunks: ["examples"],
      // hash: true, // 不 hash
    }) as unknown as webpack.Plugin,
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].[hash:6].css",
    }),
  ],
  optimization,
})

export default prodWebpackConfig
