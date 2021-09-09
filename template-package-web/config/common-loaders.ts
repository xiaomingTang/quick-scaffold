import MiniCssExtractPlugin from "mini-css-extract-plugin"
import autoprefixer from "autoprefixer"

import Paths from "./paths"
import { isProduction } from "./constants"
import webpack from "webpack"

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
        localIdentName: "[local]_[contenthash:5]",
      },
      importLoaders: 2,
      localsConvention: "camelCase",
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
  },
}

const lessLoader = {
  loader: "less-loader",
  options: {
    sourceMap: true,
  }
}

const tsConfigFileMap = {
  umd: "tsconfig.prod.umd.json",
  esm: "tsconfig.prod.esm.json",
  cjs: "tsconfig.prod.cjs.json",
  examples: "tsconfig.prod.examples.json",
}
const tsConfigFilePath = tsConfigFileMap[process.env.LIB_TARGET] || "tsconfig.prod.base.json"

export const resolve: webpack.Configuration["resolve"] = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  alias: {
    "react-dom": "@hot-loader/react-dom",
    "@Src": Paths.Src,
    "@Examples": Paths.Examples,
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
          transpileOnly: !isProduction, // 要生成.d.ts文件就不能开启该选项
          configFile: tsConfigFilePath
        },
      },
    ],
  },
  {
    test: /\.[tj]sx?$/,
    include: [
      Paths.Examples,
    ],
    use: [
      "babel-loader",
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true, // 要生成.d.ts文件就不能开启该选项
          configFile: tsConfigFilePath
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
    include: [
      Paths.Src, Paths.Examples,
    ],
    use: [
      ...cssLoader,
      postcssLoader,
      lessLoader,
    ],
  },
  {
    test: /\.module\.less$/,
    include: [
      Paths.Src, Paths.Examples,
    ],
    use: [
      ...cssModuleLoader,
      postcssLoader,
      lessLoader,
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|ico)(\?.*)?$/i,
    include: [
      Paths.Src, Paths.Examples,
    ],
    use: [{
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "static/images/[name].[contenthash:5].[ext]"
      }
    }]
  },
  {
    test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
    include: [
      Paths.Src, Paths.Examples,
    ],
    use: [{
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "static/fonts/[name].[contenthash:5].[ext]"
      }
    }]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
    include: [
      Paths.Src, Paths.Examples,
    ],
    loader: "url-loader",
    options: {
      limit: 8192,
      name: "static/medias/[name].[contenthash:5].[ext]" // 文件名
    }
  },
]
