function assert(conditions: boolean, message?: string): void {
  if (!conditions) {
    throw new Error(message || "Assertion failed!")
  }
}

/**
 * 返回一个位于 min ~ max 之间的整数
 * @param _min 最小值 应当是整数(即使不是整数, 也会通过 Math.ceil 转为整数)
 * @param _max 最大值 应当是整数(即使不是整数, 也会通过 Math.floor 转为整数))
 * @param filterTails 是否去除首尾
 */
export function randomInt(_min: number, _max: number, filterTails = false) {
  let min = Math.ceil(_min)
  let max = Math.floor(_max)
  if (filterTails) {
    min += 1
    max -= 1
  }
  const intBetween = max - min
  assert(intBetween >= 0, "min 与 max 之间至少要存在 1 个整数")
  return Math.floor((max - min + 1) * Math.random() + min)
}

/**
 * 从给定参数中随机挑选一个值, 并返回该值
 */
export function randomPick<T>(...args: T[]): T {
  if (args.length <= 1) {
    return args[0]
  }
  return args[randomInt(0, args.length - 1)]
}

export function clamp(val: number, min: number, max: number): number {
  if (val < min) { return min }
  if (val > max) { return max }
  return val
}
