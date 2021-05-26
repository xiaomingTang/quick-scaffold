import React, { useMemo, ReactNode } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import { useHtmlFontSize } from "./useHtmlFontSize"

/**
 * 告诉 ThemeProvider html 的 fontSize, 让 @material-ui/core 组件尺寸能正确渲染
 * (但是文字必须用 Typography 包裹, 而 @material-ui/icons 尺寸根本就不能正确渲染, 必须指明 fontSize: "inherit")
 */
export function MuiThemeProviderFixHtmlFontSize({
  children,
}: {
  children: ReactNode;
}) {
  const htmlFontSize = useHtmlFontSize()

  const theme = useMemo(() => createMuiTheme({
    typography: {
      htmlFontSize,
    },
  }), [htmlFontSize])

  return <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
}
