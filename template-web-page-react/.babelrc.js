module.exports = {
  presets: [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3,
    }],
    // 使用 ts-loader + fork-ts-checker-webpack-plugin, 不使用 typescript preset
    // "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": "css",
    }],
    ["@babel/plugin-transform-runtime", {
      "corejs": 3,
    }],
    "react-hot-loader/babel",
  ]
}
