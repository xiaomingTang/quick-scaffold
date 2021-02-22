import path from "path"
import webpack from "webpack"
import { CleanWebpackPlugin } from "clean-webpack-plugin"

import Paths from "./paths"
import { optimization } from "./webpack-optimization"

// 下面2个变量, 必须具有"幂等性", 即, 多次运行, 值必须保持不变(例如不得为 Math.random().toString() 或 Date.now().toString())
// 因为 ./webpack.prod.config.ts 和本文件会在不同时间使用到该变量
export const DLL_VAR_PREFIX = "__DLL__"
export const baseDllEntryName = "base"

const dllWebpackConfig: webpack.Configuration = {
  mode: "production",
  entry: {
    [baseDllEntryName]: ["react", "react-dom", "@hot-loader/react-dom"],
  },
  output: {
    // 这个path不能随便修改, 因为CleanWebpackPlugin用到了这个值
    // 这个目录下面的部分文件会被清理
    // 如果需要修改, 必须配合下面的CleanWebpackPlugin一起修改
    // 谨慎!!! 再谨慎!!!
    path: Paths.Dll,
    filename: "scripts/[name].[hash:5].js",
    // 存放动态链接库的全局变量名称
    library: `${DLL_VAR_PREFIX}[name]`,
  },
  plugins: [
    // 该版本类型暂未适配 webpack@5
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      // 这儿目录没错, 因为这儿的 output.path 是 Paths.Dll
      // 其实这儿可以不指定文件的(默认 output.path 全部清除), 但是很危险
      // 为了防止放了有用的文件在 output.path 下又忘记了, 导致不小心删掉
      // 干脆就明确指定移除特定文件了
      cleanOnceBeforeBuildPatterns: ["scripts/*.js", "manifest/*.json"],
    }) as unknown as webpack.Plugin,

    new webpack.DllPlugin({
      context: __dirname,
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: `${DLL_VAR_PREFIX}[name]`,
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(Paths.Dll, "manifest/[name].manifest.json"),
    }),
  ],
  optimization,
}

export default dllWebpackConfig
