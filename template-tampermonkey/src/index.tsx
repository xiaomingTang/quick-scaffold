import React from "react"
import ReactDOM from "react-dom"
import { SnackbarProvider } from "notistack"

import "@Src/polyfills/index"
import App from "@Src/components/App"
import { ErrorBoundary, ErrorFallback } from "@Src/components/ErrorHandler"
import { MuiThemeProviderFixHtmlFontSize } from "@Src/utils/MuiThemeProvider_FixHtmlFontSize"

import Styles from "./index.module.less"
import "./index.less"

const rootDom: HTMLDivElement = document.createElement("div")
rootDom.className = Styles.rootDom
document.body.appendChild(rootDom)

ReactDOM.render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={() => {
      rootDom.classList.add(Styles.error)
    }}
  >
    <MuiThemeProviderFixHtmlFontSize>
      <SnackbarProvider
        variant="info"
        maxSnack={3}
        autoHideDuration={2500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <App />
      </SnackbarProvider>
    </MuiThemeProviderFixHtmlFontSize>
  </ErrorBoundary>,
  rootDom,
)
