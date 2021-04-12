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

export function randomSoftColors(): [string, string] {
  const h = randomInt(0, 360)
  const s = randomInt(35, 65)
  const l = randomInt(35, 65)
  const inversedH = (h + 180) % 360
  const inversedS = s < 55 ? 100 : 0
  const inversedL = l < 55 ? 100 : 0
  return [`hsl(${h},${s}%,${l}%)`, `hsl(${inversedH},${inversedS}%,${inversedL}%)`]
}

export function useRandomSoftColors(): [string, string] {
  const [color] = useState(randomSoftColors)
  return color
}
