import webpack from "webpack"
import { merge } from "webpack-merge"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import prodConfig from "./webpack.prod.config"

const bundleConfig = merge(prodConfig, {
  plugins: [
    ...prodConfig.plugins,
    new BundleAnalyzerPlugin({
      // treemap sizes 为 parsed 时, bundle 分析页不会展示各项的详细信息
      // defaultSizes: "parsed"
    }) as unknown as webpack.Plugin,
  ],
})

export default bundleConfig
