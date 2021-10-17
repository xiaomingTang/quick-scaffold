interface Action {
  type: string;
}

/**
 * 当只有一个 case 时, ts 不能将 action 正确识别为 never,
 * 需要 action as never 手动将 action 标记为 never
 */
export function ensureImpossibleAction(actionTypePrefix: string, action: never) {
  // redux 初始化会执行到这儿
  if (action && (action as Action).type.startsWith(actionTypePrefix)) {
    // 正常是不会执行到这里的
    const errorMsg = `如果执行到这里了, 说明出错了, 可能你新增了 action 类型(${actionTypePrefix}), 却忘了在 reducer 的 switch case 中处理.\nwrong action: ${action}`
    if (process.env.NODE_ENV === 'development') {
      throw new Error(errorMsg)
    } else {
      console.error(errorMsg)
    }
  }
}
