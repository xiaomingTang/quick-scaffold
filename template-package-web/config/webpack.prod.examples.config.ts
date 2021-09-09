import path from "path"
import { merge } from "webpack-merge"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"

import Paths from "./paths"
import { appName } from "./constants"
import { log } from "./utils"

log.info('generating examples...')

const examplesWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    examples: path.resolve(Paths.Examples, "index.tsx"),
  },
  externals: {},
  optimization,
  output: {
    path: Paths.DistExample,
    filename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "examples.html"),
      filename: "examples.html",
      title: appName,
      inject: "body",
      chunks: ["examples"],
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].[contenthash:5].css",
    }),
  ],
})

export default examplesWebpackConfig
