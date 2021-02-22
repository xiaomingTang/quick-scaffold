import { defaultLang, availableLangs } from "@Src/i18n/datas"

export interface State {
  lang: string;
}

export const initState: State = {
  lang: defaultLang,
}

export type Action = {
  type: "@globalSettings/i18n";
  value: string;
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
    return state
  }
  default:
    if (/^@globalSettings/g.test(action.type)) {
      // 这儿的赋值, 是用于类型检查的
      const neverAction: never = action.type
      console.error("wrong action: ", neverAction)
    }
    return state
  }
}
