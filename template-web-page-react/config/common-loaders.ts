import MiniCssExtractPlugin from "mini-css-extract-plugin"
import autoprefixer from "autoprefixer"
import webpack from "webpack"

import Paths from "./paths"
import { isProduction } from "./constants"

const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader"

const cssLoader = [
  styleLoader,
  "css-loader",
]

const cssModuleLoader = [
  styleLoader,
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isProduction ? "[contenthash:5]" : "[local]_[contenthash:5]",
        exportLocalsConvention: "camelCase",
      },
      importLoaders: 2,
      sourceMap: true,
    }
  },
]

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        autoprefixer,
      ],
    },
  }
}

const lessLoader = {
  loader: "less-loader",
  options: {
    sourceMap: true
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
        name: "packages/images/[name].[contenthash:5].[ext]"
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
        name: "packages/fonts/[name].[contenthash:5].[ext]"
      }
    }]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
    include: Paths.Src,
    loader: "url-loader",
    options: {
      limit: 8192,
      name: "packages/medias/[name].[contenthash:5].[ext]" // 文件名
    }
  },
]
