import webpack from "webpack"
import { merge } from "webpack-merge"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import clipboardy from "clipboardy"
import { InjectStringWebpackPlugin } from "inject-string-webpack-plugin"

import { optimization } from "./webpack-optimization"
import commonConfig from "./webpack.common.config"
import {
  prefix, suffix,
} from "./constants"
import { log } from "./utils"

const prodConfig = merge(commonConfig, {
  plugins: [
    ...commonConfig.plugins,
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      cleanOnceBeforeBuildPatterns: ["index.html", "packages/scripts/*"],
    }) as unknown as webpack.Plugin,
    new InjectStringWebpackPlugin({
      test: /packages[/\\]scripts[/\\]index\..*js/g,
      prefix,
      suffix,
      afterInject: (assetName, asset) => {
        clipboardy.writeSync(asset.source())
        log.success("all script copied")
      },
    }),
  ],
  optimization,
})

export default prodConfig
