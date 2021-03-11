import { hot } from "react-hot-loader/root"
import React from "react"

import "@Src/examples/global/global"

import { testExport } from "@Src/index"

import Styles from "./App.module.less"

function App() {
  return <div className={Styles.success}>variable from @Src/index.ts: {JSON.stringify(testExport)}</div>
}

export default hot(App)
