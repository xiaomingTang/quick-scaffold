import TerserPlugin from "terser-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
import webpack from "webpack"

export const optimization: webpack.Options.Optimization = {
  minimizer: [
    new TerserPlugin({
      // exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
      parallel: true, // 开启并行压缩，充分利用 cpu
      extractComments: false, // 不保留 @license @preserve 等信息
      terserOptions: {
        compress: {
          unused: true,
          drop_debugger: true,
        },
        output: {
          comments: false, // 移除注释
        },
        sourceMap: false, // 不保留 sourceMap
      }
    }),
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
    }),
  ],
}
