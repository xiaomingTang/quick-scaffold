import MiniCssExtractPlugin from "mini-css-extract-plugin"
import autoprefixer from "autoprefixer"

import Paths from "./paths"
import { isProduction } from "./Constants"
import webpack from "webpack"

const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader"

const cssLoader = [
  styleLoader,
  "css-loader",
].filter(Boolean)

const cssModuleLoader = [
  styleLoader,
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[local]_[hash:base64:5]",
      },
      importLoaders: 2,
      localsConvention: "camelCase",
      sourceMap: !isProduction,
    }
  },
]

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer,
    ]
  }
}

const lessLoader = {
  loader: "less-loader",
  options: {
    sourceMap: !isProduction
  }
}

export const resolve: webpack.Configuration["resolve"] = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  alias: {
    "react-dom": "@hot-loader/react-dom",
    "@Src": Paths.Src,
  }
}

export const rules: webpack.Configuration["module"]["rules"] = [
  {
    test: /\.m?js$/,
    // resolve: {
    //   // 修复 webpack5 的 mjs 相关的 bug (具体我也忘了, 因为 react-hot-loader 在 webpack5 下 not working, 所以已经启用 webpack5 了...)
    //   fullySpecified: false
    // }
  },
  {
    test: /\.[tj]sx?$/,
    include: [
      Paths.Src,
    ],
    use: [
      "babel-loader",
      {
        loader: "ts-loader",
        options: {
          // 开发时无需类型检查(编辑器会提示)
          // 生产中使用 fork-ts-checker-webpack-plugin (可见 ./webpack.prod.config.ts)
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.css$/,
    // 这儿不能用 include, 因为 node_modules 中的包也需要 loader
    use: cssLoader,
  },
  {
    test: /(?<!\.module)\.less$/,
    include: Paths.Src,
    use: [
      ...cssLoader,
      postcssLoader,
      lessLoader,
    ],
  },
  {
    test: /\.module\.less$/,
    include: Paths.Src,
    use: [
      ...cssModuleLoader,
      postcssLoader,
      lessLoader,
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|ico)(\?.*)?$/i,
    include: Paths.Src,
    use: [{
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "packages/images/[name].[hash:5].[ext]"
      }
    }]
  },
  {
    test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
    include: Paths.Src,
    use: [{
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "packages/fonts/[name].[hash:5].[ext]"
      }
    }]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
    include: Paths.Src,
    loader: "url-loader",
    options: {
      limit: 8192,
      name: "packages/medias/[name].[hash:5].[ext]" // 文件名
    }
  },
]
