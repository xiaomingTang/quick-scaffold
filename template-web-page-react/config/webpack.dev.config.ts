import { HotModuleReplacementPlugin } from "webpack"
import { merge } from "webpack-merge"

import commonWebpackConfig from "./webpack.common.config"
import Paths from "./paths"

const devWebpackConfig = merge(commonWebpackConfig, {
  devServer: {
    static: Paths.Dist,
    host: "local-ip",
    port: 8080,
    hot: true,
    open: "./index.html",
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
    new HotModuleReplacementPlugin(),
  ]
})

export default devWebpackConfig
