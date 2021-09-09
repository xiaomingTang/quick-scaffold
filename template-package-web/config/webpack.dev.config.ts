import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { merge } from "webpack-merge"
import WebpackDevServer from "webpack-dev-server"

import Paths from "./paths"
import { appName } from "./constants"
import commonWebpackConfig from "./webpack.common.config"

const devServer: WebpackDevServer.Configuration = {
  static: Paths.DistExample,
  host: "local-ip",
  port: 8080,
  hot: true,
  open: "./examples.html",
  // 开发时代理, 可解决开发时跨域问题
  proxy: [
    {
      context: [
        "/your-custom-api",
      ],
      target: "https://your-website.com",
      secure: false,
      changeOrigin: true,
    },
  ],
}

const devWebpackConfig = merge(commonWebpackConfig, {
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  entry: {
    // HtmlWebpackPlugin.Options.chunks 需要跟着 entry 一起改动, 指出该 HtmlWebpackPlugin 需要的 chunks.
    examples: ["react-hot-loader/patch", path.resolve(Paths.Examples, "index.tsx")],
  },
  output: {
    path: Paths.DistExample,
    filename: "static/scripts/[name].[contenthash:5].js",
    chunkFilename: "static/scripts/chunk-[name].js",
  },
  // @ts-ignore
  devServer: devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "examples.html"),
      filename: "examples.html",
      title: appName,
      inject: "body",
      chunks: ["examples"],
    }),
  ]
})

export default devWebpackConfig
