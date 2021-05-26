import packageMetaData from "../package.json"

// -------------------------------------
// 以下为自定义区, 请根据注释进行自定义配置
// -------------------------------------

/**
 * 一. src 中用到的 tampermonkey 内置函数, 均需要在 prefix 中声明 @grant
 *
 * 二. externals 中用到的包, 应当
 *   1. 在 prefix 中声明 @require
 *   2. 在下面的 const externals 中声明
 *   3. 执行 yarn add -D *** 将之作为 devDependencies, 以便在 development 环境下运行
 */
export const prefix = `
// ==UserScript==
// @lastUpdate   ${new Date().toLocaleString()/* 这个参数类似于版本号, 你可以注意该参数, 以证明你确实更新了该脚本 */}

// @name         ${packageMetaData.name || "tamperscript name"}
// @author       ${packageMetaData.author || "tamperscript author"}
// @version      ${packageMetaData.version || "1.0.0"}
// @description  ${packageMetaData.description || "tamperscript description"}
// @namespace    https://www.tampermonkey.net/

// @match        http*://*.baidu.com/*

// @require      https://cdn.bootcdn.net/ajax/libs/react/16.14.0/umd/react.production.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/react-dom/16.14.0/umd/react-dom.production.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/material-ui/4.11.2/umd/material-ui.production.min.js

// ==/UserScript==

`

/**
 * externals 中用到的包, 应当在此处声明
 */
export const externals = {
  react: "React",
  "react-dom": "ReactDOM",
  "@material-ui/core": "MaterialUI",
}

// -------------------------------------
// 以上即为自定义区
// -------------------------------------

export const isProduction = process.env.NODE_ENV !== "development"

export const suffix = "\n"

export const packageJson = packageMetaData
