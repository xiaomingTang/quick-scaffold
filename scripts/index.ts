#!/usr/bin/env node
import { init } from "./commands/init"

async function main() {
  await init()
}

if (require.main === module) {
  main()
}
