import React from "react"
import { HTMLAttributes } from "react"
import { joinSpace } from "@Src/utils"

import "./iconfont/iconfont.css"

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type: string;
}

export default function Iconfont({
  type, className, ...props
}: Props) {
  return <span
    className={joinSpace(
      `iconfont iconfont-${type}`,
      className,
    )}
    {...props}
  />
}
