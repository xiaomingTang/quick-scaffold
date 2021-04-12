import { useState, useEffect } from "react"
import { throttle } from "throttle-debounce"

export interface Size {
  width: number;
  height: number;
}

function getDocAvailSize(): Size {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}

function getBodyScrollSize(): Size {
  return {
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
  }
}

function getWindowSize(): Size {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

type SizeType = "DOC_AVAIL_SIZE" | "BODY_SCROLL_SIZE" | "WINDOW_SIZE"

const getSizeMap: {
  [key in SizeType]: () => Size;
} = {
  DOC_AVAIL_SIZE: getDocAvailSize,
  BODY_SCROLL_SIZE: getBodyScrollSize,
  WINDOW_SIZE: getWindowSize,
}

export function useSize(type: SizeType = "DOC_AVAIL_SIZE", throttleTime = 200): Size {
  const [state, setState] = useState<Size>({
    width: 1,
    height: 1,
  })

  useEffect(() => {
    const resizeHandler = throttle(throttleTime, () => {
      const getSizeFunc = getSizeMap[type]
      if (getSizeFunc) {
        setState(getSizeFunc)
      } else {
        console.error(`useSize parameter error: type expected SizeType, got ${type}`)
      }
    })

    resizeHandler()

    window.addEventListener("resize", resizeHandler)
    // 微信内置浏览器环境下, 屏幕旋转不会触发 resize 事件, 所以额外新增一个 orientationchange 监听
    window.addEventListener("orientationchange", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
      window.removeEventListener("orientationchange", resizeHandler)
    }
  }, [type, throttleTime])

  return state
}

type Orientation = "PORTRAIT" | "LANDSCAPE"

export function useOrientation(): Orientation {
  const docSize = useSize("DOC_AVAIL_SIZE")
  return docSize.width > docSize.height ? "LANDSCAPE" : "PORTRAIT"
}
