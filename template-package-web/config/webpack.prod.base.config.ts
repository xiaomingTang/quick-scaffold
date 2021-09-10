import path from "path"
import { merge } from "webpack-merge"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"
import Paths from "./paths"

const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    index: path.resolve(Paths.Src, "index.ts"),
  },
  optimization,
})

export default prodWebpackConfig
