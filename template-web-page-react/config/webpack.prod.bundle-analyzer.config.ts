import { merge } from "webpack-merge"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import prodWebpackConfig from "./webpack.prod.config"

const devConfig = merge(prodWebpackConfig, {
  plugins: [
    ...prodWebpackConfig.plugins,
    new BundleAnalyzerPlugin({
      // treemap sizes 为 parsed 时, bundle 分析页不会展示各项的详细信息
      // defaultSizes: "parsed"
    })
  ],
})

export default devConfig
