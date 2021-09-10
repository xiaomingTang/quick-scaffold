import TerserPlugin from "terser-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
import webpack from "webpack"

export const optimization: webpack.WebpackOptionsNormalized["optimization"] = {
  minimizer: [
    new TerserPlugin({
      parallel: true, // 开启并行压缩，充分利用 cpu
      extractComments: true, // 保留 @license @preserve 等信息
      terserOptions: {
        compress: {
          unused: true,
          drop_debugger: true,
        },
        output: {
          comments: false, // 移除注释
        },
        sourceMap: true, // 保留 sourceMap
      }
    }),
    // 该版本类型暂未适配 webpack@5
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 禁止移除 autoprefixer 添加的前缀
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true
    }) as webpack.WebpackPluginInstance,
  ],
}
