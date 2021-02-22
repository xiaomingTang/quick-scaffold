/**
 * 不知道为什么, 当 dist/index.js 作为 package.json 中 bin 的值
 * 
 * windows 无视 #!/usr/bin/env node 的声明, 仍然当作 JScript 文件处理, 导致脚本出错
 * 
 * 后缀不为 .js 则能正确调用 node 来执行脚本
 * 
 * 所以本文件是专用于将 dist/index.js 重命名为 dist/index (移除 .js 后缀)
 */
import fs from "fs"

import { resolveProject, log } from "./utils"

function rename() {
  try {
    fs.renameSync(resolveProject("dist/index.js"), resolveProject("dist/index"))
  } catch (error) {
    log.error("rename error, or you can rename quick-scaffold/dist/index.js to quick-scaffold/dist/index manually")
  }  
}

if (require.main === module) {
  rename()
} else {
  log.warn("this file is only used for rename dist/index.js, cannot be imported.")
}
