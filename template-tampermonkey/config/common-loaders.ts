import webpack from "webpack"
import autoprefixer from "autoprefixer"

import Paths from "./paths"
import { isProduction } from "./constants"

// 1 M
const URL_SIZE_LIMIT = 1024 * 1024 * 1

// always style-loader, not mini-css-extract-plugin
const styleLoader = "style-loader"

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
    },
  },
]

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer,
    ],
  },
}

const lessLoader = {
  loader: "less-loader",
  options: {
    sourceMap: !isProduction,
  },
}

export const resolve: webpack.Configuration["resolve"] = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  alias: {
    "react-dom": "@hot-loader/react-dom",
    "@Src": Paths.Src,
  },
}

export const rules: webpack.Configuration["module"]["rules"] = [
  {
    test: /\.[tj]sx?$/,
    include: [
      Paths.Src,
      // 有一些包导出的是 es6+, 需要使用 babel-loader
      // path.join(Paths.Root, "array-move"),
    ],
    use: [
      "babel-loader",
      {
        loader: "ts-loader",
        options: {
          // 我日了, 这个b东西默认是 false, 会导致 react-hot-loader 失效!!!
          // 导致 react-hot-loader 热重载一次就失效, 而变成 full page reload!!!
          // 艹艹艹艹艹 浪费了我将近一天时间!!!
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
        limit: URL_SIZE_LIMIT,
        name: "packages/images/[name].[hash:5].[ext]",
      },
    }],
  },
  {
    test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
    include: Paths.Src,
    use: [{
      loader: "url-loader",
      options: {
        limit: URL_SIZE_LIMIT,
        name: "packages/fonts/[name].[hash:5].[ext]",
      },
    }],
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
    include: Paths.Src,
    loader: "url-loader",
    options: {
      limit: URL_SIZE_LIMIT,
      name: "packages/medias/[name].[hash:5].[ext]", // 文件名
    },
  },
]
