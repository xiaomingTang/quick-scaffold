import { merge } from "webpack-merge"
import { CleanWebpackPlugin } from "clean-webpack-plugin"

import prodWebpackConfig from "./webpack.prod.base.config"
import { log } from "./utils"
import Paths from "./paths"

log.info('generating esm...')

const cjsWebpackConfig = merge(prodWebpackConfig, {
  experiments: {
    outputModule: true,
  },
  output: {
    path: Paths.DistEsm,
    filename: "[name].js",
    library: {
      type: 'module',
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
})

export default cjsWebpackConfig
