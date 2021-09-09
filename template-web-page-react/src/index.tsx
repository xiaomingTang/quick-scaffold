import React from "react"
import ReactDOM from "react-dom"

import "@Src/polyfills"

import "@Src/i18n"

import AppRouter from "./routes"

import "./index.less"

ReactDOM.render(
  <AppRouter />,
  document.querySelector("#app"),
)
