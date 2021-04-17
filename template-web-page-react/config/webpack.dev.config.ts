import { HotModuleReplacementPlugin } from "webpack"
import { merge } from "webpack-merge"

import commonWebpackConfig from "./webpack.common.config"
import Paths from "./paths"
import { isMeansTrue } from "./utils"

const devWebpackConfig = merge(commonWebpackConfig, {
  devServer: {
    contentBase: Paths.Dist,
    https: isMeansTrue(process.env.https),
    host: "0.0.0.0",
    port: 8080,
    useLocalIp: true,
    hot: true,
    open: true,
    openPage: "./index.html",
    // 开发时代理, 可解决开发时跨域问题
    proxy: [
      {
        context: [
          "/your-custom-api",
        ],
        target: "https://your-website.com",
        secure: false,
        changeOrigin: true,
      }
    ],
  },
  plugins: [
    ...commonWebpackConfig.plugins,
    new HotModuleReplacementPlugin(),
  ]
})

export default devWebpackConfig
