import webpack, { HotModuleReplacementPlugin } from "webpack"
import { merge } from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"

import commonConfig from "./webpack.common.config"
import Paths from "./paths"
import { isMeansTrue } from "./utils"
import { packageJson } from "./constants"

const devConfig = merge(commonConfig, {
  devServer: {
    contentBase: Paths.Dist,
    https: isMeansTrue(process.env.https),
    host: "0.0.0.0",
    port: 1080,
    useLocalIp: true,
    hot: true,
    open: isMeansTrue(process.env.open),
    openPage: "./index.html",
  },
  plugins: [
    ...commonConfig.plugins,
    new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      title: packageJson.name,
      inject: "body",
      chunks: ["index"],
      favicon: path.join(Paths.Public, "favicon.ico"),
    }) as unknown as webpack.Plugin,
    new HotModuleReplacementPlugin(),
  ],
})

export default devConfig
