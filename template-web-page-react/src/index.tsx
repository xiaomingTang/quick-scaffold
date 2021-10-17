import React from "react"
import ReactDOM from "react-dom"

import "@Src/global"

import AppRouter from "./routes"

ReactDOM.render(
  <AppRouter />,
  document.querySelector("#app"),
)
