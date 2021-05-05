import {
  useState, useEffect, Dispatch, SetStateAction,
} from "react"
import { randomInt } from "./math"

export function joinSpace(...arr: (string | false | undefined | null)[]) {
  return arr.filter((item) => !!item).join(" ")
}

/**
 * 生成一个"能将状态持久化，不因组件destroy而消失的hook"
 * 使用方法是在 **组件外** 执行 genePermanentState 方法，返回值即为上述所说的 hook
 * 由于需要持久化，因此内存占用不会回收，必要时才能使用，不可滥用
 */
export function genePermanentState<T>() {
  let memo: T | undefined
  return function usePermanentState(initialState?: T | (() => T)): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
    const [state, setState] = useState(memo || initialState)

    useEffect(() => {
      memo = state
    }, [state])

    return [state, setState]
  }
}

/**
 * @returns colorArray: hsl 格式的颜色字符串
 *
 * colorArray[0]: 随机柔和背景色
 *
 * colorArray[1]: 该背景色下最佳的前景色(常用于作为文本颜色)
 */
export function randomSoftColors(): [string, string] {
  // h s l 表示随机背景色
  // inversed* 表示前景色(该背景下最适宜的文本色值)
  const h = randomInt(0, 360)
  const s = randomInt(20, 40)
  const l = randomInt(35, 65)
  // hue 值简单地偏移 180° 算了
  const inversedH = (h + 180) % 360
  // 饱和度不变
  const inversedS = s
  /**
   * "纯净度"(没文化的我自创的词)
   *
   * 我发现当 hue 值越接近 0 / 120 / 240 / 360 时, 人们(我)会感觉这个颜色较"深"
   *
   * 而当 hue 值越接近 60 / 180 / 300 时, 人们(我)会感觉这个颜色较"浅"
   *
   * 因此"纯净度"表示 hue 值接近 0 / 120 / 240 / 360 的程度
   *
   * 越大表示越"纯净", 颜色越"深"
   */
  const purity = Math.abs(((h % 120) - 60) / 60)
  /**
   * "亮度平衡"(没文化的我自创的词)
   *
   * 我发现当亮度越接近 50% 时, "纯净度"的"话语权"就越大
   *
   * 亮度偏离 50% (lightBalance 大), 颜色"深浅"由 亮度 控制(亮度越大, 颜色越浅)
   *
   * 亮度接近 50% (lightBalance 小), 颜色"深浅"由 "纯净度" 控制(纯净度越小, 颜色越浅)
   */
  const lightBalance = Math.abs((l - 50) / 50)
  let inversedL = 10
  // 以下均为经验值
  if (lightBalance > 0.1) {
    inversedL = l > 50 ? 10 : 90
  } else {
    inversedL = purity < 0.25 ? 10 : 90
  }
  return [`hsl(${h}deg,${s}%,${l}%)`, `hsl(${inversedH}deg,${inversedS}%,${inversedL}%)`]
}

/**
 * @returns colorArray: hsl 格式的颜色字符串
 *
 * colorArray[0]: 随机柔和背景色
 *
 * colorArray[1]: 该背景色下最佳的前景色(常用于作为文本颜色)
 */
export function useRandomSoftColors(): [string, string] {
  const [color] = useState(randomSoftColors)
  return color
}
