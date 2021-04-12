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

export function getCssTransitionClassName(styleMap: Record<string, string>, rawClassName: string): CSSTransitionClassNames {
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
