import React from "react"
import { Spin } from "antd"
import { CloseCircleFilled } from "@ant-design/icons"

import Styles from "./index.module.less"

interface Props {
  text?: string;
}

export function Loading({
  text = "加载中...",
}: Props) {
  return <div className={Styles.title}>
    <Spin tip={text} />
  </div>
}

export function Error({
  text = "加载错误",
}: Props) {
  return <div className={Styles.title}>
    <Spin tip={text} indicator={<CloseCircleFilled className={Styles.error} />} />
  </div>
}
