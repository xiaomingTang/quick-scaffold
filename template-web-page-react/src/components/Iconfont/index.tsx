import React, { HTMLAttributes } from "react"
import { joinSpace } from "@Src/utils"

import "./iconfont/iconfont.css"

interface Props extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 阿里 iconfont 图标名称(无须 iconfont- 前缀)
   */
  type: string;
}

/**
 * 阿里 iconfont 默认会为 .iconfont 类添加 font-size: 16px 样式
 *
 * 因此如需设置字体, 需在 style 中覆盖 fontSize
 *
 * 本组件默认提供 fontSize: inherit;
 *
 * 使用者如有需要可自行覆盖
 */
export default function Iconfont({
  type, className, style, ...props
}: Props) {
  return <span
    className={joinSpace(
      `iconfont iconfont-${type}`,
      className,
    )}
    style={{
      fontSize: "inherit",
      ...style,
    }}
    {...props}
  />
}
