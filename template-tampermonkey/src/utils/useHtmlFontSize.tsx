import { useMemo, useState } from "react"
import { useRafLoop } from "react-use"
import { throttle } from "throttle-debounce"

const DefaultHtmlFontSize = 16
const html = document.querySelector("html")

if (!html) {
  console.error("no html element!")
}

export function getHtmlFontSize(): number {
  if (!html) {
    return DefaultHtmlFontSize
  }

  const fontSizeStr = window.getComputedStyle(html, null).getPropertyValue("font-size").replaceAll(/\s/g, "") || `${DefaultHtmlFontSize}px`

  // font-size: 2;
  if (/^[\d.]+$/i.test(fontSizeStr)) {
    return Math.floor(parseFloat(fontSizeStr) * DefaultHtmlFontSize)
  }
  // font-size: 80%;
  if (/^[\d.]+%$/i.test(fontSizeStr)) {
    return Math.floor(parseFloat(fontSizeStr) * (DefaultHtmlFontSize / 100))
  }
  // font-size: 14px;
  if (/^[\d.]+\w+$/i.test(fontSizeStr)) {
    return Math.floor(parseFloat(fontSizeStr))
  }
  // 其他未知情况
  return DefaultHtmlFontSize
}

export function useHtmlFontSize() {
  const [htmlFontSize, setHtmlFontSize] = useState(getHtmlFontSize)

  const resetHtmlFontSize = useMemo(() => throttle(1000, () => {
    setHtmlFontSize(getHtmlFontSize)
  }), [])

  useRafLoop(resetHtmlFontSize)

  return htmlFontSize
}
