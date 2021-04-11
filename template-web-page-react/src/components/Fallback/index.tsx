import React, { HTMLAttributes } from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { SpinProps } from "antd/lib/spin"

import { joinSpace } from "@Src/utils"

import Styles from "./index.module.less"

interface Props extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  spinProps?: SpinProps;
}

export function Loading({
  text = "加载中...", className, spinProps, ...props
}: Props) {
  return <div className={joinSpace(Styles.title, className)} {...props}>
    <Spin tip={text} indicator={<LoadingOutlined />} {...spinProps} />
  </div>
}
