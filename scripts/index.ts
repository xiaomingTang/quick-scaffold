#!/usr/bin/env node
import { init } from "./commands/init"
import { log, resolveProject } from "./utils"

async function main() {
  await init()
}

if (require.main === module) {
  const { name, version } = require(resolveProject("package.json"))
  log.success(`${name}: ${version}`)
  main()
}
