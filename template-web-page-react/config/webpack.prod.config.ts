/**
 * pwa 及 service-worker 相关请看:
 *
 * https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
 *
 * https://jakearchibald.com/2016/caching-best-practices/
 */

import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import AddAssetHtmlPlugin from "add-asset-html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import WebpackPwaManifest from "webpack-pwa-manifest"
import { GenerateSW } from "workbox-webpack-plugin"

import commonWebpackConfig from "./webpack.common.config"
import { optimization } from "./webpack-optimization"

import Paths from "./paths"
import { baseDllEntryName, DLL_VAR_PREFIX } from "./webpack.dll.config"

const prodWebpackConfig = merge(commonWebpackConfig, {
  plugins: [
    ...commonWebpackConfig.plugins,
    // 该版本类型暂未适配 webpack@5
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      cleanOnceBeforeBuildPatterns: [
        "*.html",
        "service-worker.js", "service-worker.*.js", "workbox.js", "workbox-*.js",
        "manifest/*", "manifest.json", "manifest.*.json",
        "packages/scripts/*", "packages/styles/*",
      ],
    }) as unknown as webpack.Plugin,
    // 该版本类型暂未适配 webpack@5
    new MiniCssExtractPlugin({
      filename: "packages/styles/[name].[hash:5].css",
    }) as unknown as webpack.Plugin,
    new webpack.DllReferencePlugin({
      context: __dirname,
      name: `${DLL_VAR_PREFIX}${baseDllEntryName}`,
      manifest: require(path.join(Paths.Dll, `manifest/${baseDllEntryName}.manifest.json`)),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(Paths.Dll, "scripts/*.js"),
      outputPath: "packages/dll/scripts",
      publicPath: "packages/dll/scripts",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: true,
      eslint: {
        enabled: true,
        files: Paths.Src,
      },
    }),
    new WebpackPwaManifest({
      // 该组件会使用 webpack output.publicPath 属性
      // 而 webpack5 output.publicPath 默认值为 "auto"(而非 "/" 或 "./")
      // 如果使用 webpack5, 要注意这个问题
      filename: "manifest.[hash:5].json",
      name: "<%= scaffoldConfig.projectName %>",
      short_name: "<%= scaffoldConfig.projectName %>",
      description: "<%= scaffoldConfig.description %>",
      display: "standalone",
      start_url: ".",
      background_color: "#ffffff",
      crossorigin: "use-credentials",
      ios: true,
      icons: [
        {
          src: path.resolve(Paths.Public, "manifest/icons/64-64.png"),
          size: "64x64",
          destination: "manifest/icons",
        },
        {
          src: path.resolve(Paths.Public, "manifest/icons/128-128.png"),
          size: "128x128",
          destination: "manifest/icons",
          ios: "startup",
        },
        {
          src: path.resolve(Paths.Public, "manifest/icons/256-256.png"),
          size: "256x256",
          destination: "manifest/icons",
          ios: true,
        }
      ],
    }),
    new GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
      /**
       * 可以将不常变动的资源加入缓存
       */
      runtimeCaching: [
        {
          urlPattern: "translation.json",
          handler: "StaleWhileRevalidate",
        },
      ],
    }),
  ],
  optimization,
})

export default prodWebpackConfig
