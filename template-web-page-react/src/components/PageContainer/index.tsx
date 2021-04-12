import React, { HTMLAttributes } from "react"
import { joinSpace } from "@Src/utils"
import Styles from "./index.module.less"

export function PageContainer({
  children, className, ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={joinSpace(className, Styles.pageContainer)} {...props}>
    {children}
  </div>
}
