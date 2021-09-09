import { merge } from "webpack-merge"
import { CleanWebpackPlugin } from "clean-webpack-plugin"

import prodWebpackConfig from "./webpack.prod.base.config"
import { convertToPascalCase, log } from "./utils"
import Paths from "./paths"
import { appName } from "./constants"

const PascalCaseName = convertToPascalCase(appName)

log.info('generating umd...')

const cjsWebpackConfig = merge(prodWebpackConfig, {
  output: {
    path: Paths.DistUmd,
    filename: "[name].js",
    library: {
      name: PascalCaseName,
      type: 'umd',
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
})

export default cjsWebpackConfig
