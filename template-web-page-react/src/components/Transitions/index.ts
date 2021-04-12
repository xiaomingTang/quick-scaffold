import moduledStyles from "./index.module.less"

export const Styles = moduledStyles

export interface CSSTransitionClassNames {
  appear?: string;
  appearActive?: string;
  appearDone?: string;
  enter?: string;
  enterActive?: string;
  enterDone?: string;
  exit?: string;
  exitActive?: string;
  exitDone?: string;
}

export function getTransitionClassName(styleMap: Record<string, string>, rawClassName: string): CSSTransitionClassNames {
  return {
    appear: styleMap[`${rawClassName}Appear`],
    appearActive: styleMap[`${rawClassName}AppearActive`],
    appearDone: styleMap[`${rawClassName}AppearDone`],
    enter: styleMap[`${rawClassName}Enter`],
    enterActive: styleMap[`${rawClassName}EnterActive`],
    enterDone: styleMap[`${rawClassName}EnterDone`],
    exit: styleMap[`${rawClassName}Exit`],
    exitActive: styleMap[`${rawClassName}ExitActive`],
    exitDone: styleMap[`${rawClassName}ExitDone`],
  }
}

export const transitionClassNameMap = {
  zoom: getTransitionClassName(Styles, "zoom"),
  rotate: getTransitionClassName(Styles, "rotate"),
  wobble: getTransitionClassName(Styles, "wobble"),
  layer: getTransitionClassName(Styles, "layer"),
}

export type TransitionType = keyof typeof transitionClassNameMap

export const availableTransitionTypes = Object.keys(transitionClassNameMap) as TransitionType[]

export const defaultTransitionType = availableTransitionTypes[0]
