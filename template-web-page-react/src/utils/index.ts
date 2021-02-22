import {
  useState, useEffect, Dispatch, SetStateAction,
} from "react"

export function joinSpace(...arr: (string | false | undefined)[]) {
  return arr.filter((item) => !!item).join(" ")
}

/**
 * 生成一个"能将状态持久化，不因组件destroy而消失的hook"
 * 使用方法是在 组件外 执行 geneLongTermState 方法，返回值即为上述所说的 hook
 * 由于需要持久化，因此内存占用不会回收，必要时才能使用，不可滥用
 */
export function geneLongTermState<T>() {
  let memo: T | undefined
  return function useLongTermState(initialState?: T | (() => T)): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
    const [data, setState] = useState(memo || initialState)

    useEffect(() => {
      memo = data
    }, [data])

    return [data, setState]
  }
}
