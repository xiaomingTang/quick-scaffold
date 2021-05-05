import { defaultLang, availableLangs } from "@Src/i18n/datas"
import { TransitionType, availableTransitionTypes } from "@Src/components/Transitions"

interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{
    outcome: "installed" | "dismissed";
    platform: "web" | "android" | "windows" | "";
  }>;
  prompt(): Promise<void>;
}

export interface State {
  deferredPrompt?: BeforeInstallPromptEvent;
  lang: string;
  transitionType: TransitionType;
}

export const initState: State = {
  lang: defaultLang,
  transitionType: "zoom",
}

export type Action = {
  type: "@globalSettings/i18n";
  value: string;
} | {
  type: "@globalSettings/transitionType";
  value: TransitionType;
} | {
  type: "@globalSettings/deferredPrompt";
  value?: BeforeInstallPromptEvent;
}

export function reducer(state = initState, action: Action): State {
  switch (action.type) {
  case "@globalSettings/i18n": {
    const lang = action.value
    if (availableLangs.includes(lang)) {
      return {
        ...state,
        lang: action.value,
      }
    }
    console.error(`wrong language: ${lang}`)
    return state
  }
  case "@globalSettings/transitionType": {
    const transitionType = action.value
    if (availableTransitionTypes.includes(transitionType)) {
      return {
        ...state,
        transitionType: action.value,
      }
    }
    console.error(`wrong language: ${transitionType}`)
    return state
  }
  case "@globalSettings/deferredPrompt": {
    return {
      ...state,
      deferredPrompt: action.value,
    }
  }
  default: {
    // redux 初始化会执行到这儿
    if (action && !/^@@redux/.test((action as Action).type)) {
      // 这儿的赋值, 是仅用于类型检查的, 正常是不会执行到这里的
      const neverAction: never = action
      console.error("如果执行到这里了, 说明出错了, 可能你新增了 action 类型, 却忘了在 reducer 的 switch case 中处理.\n\nwrong action: ", neverAction)
    }
    return state
  }
  }
}
