import { joinSpace } from "@Src/utils"
import React, {
  AnchorHTMLAttributes, ReactNode, useMemo,
} from "react"

import Iconfont from "@Src/components/Iconfont"

import Styles from "./index.module.less"

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
}

export function Anchor({
  href,
  target,
  rel,
  className,
  children,
  icon,
  ...props
}: AnchorProps) {
  const isOuterSite = useMemo(() => {
    const url = new URL(href || "", window.location.href)
    return url.hostname !== window.location.hostname
  }, [href])

  const finalIcon: ReactNode = useMemo(() => {
    if (icon !== undefined) {
      return icon
    }
    return <sup><Iconfont type={isOuterSite ? "link-outer" : "link-inner"} /></sup>
  }, [icon, isOuterSite])

  const finalTarget = useMemo(() => {
    if (target !== undefined) {
      return target
    }
    return isOuterSite ? "_blank" : "_self"
  }, [isOuterSite, target])

  const finalRel = useMemo(() => {
    if (rel !== undefined) {
      return rel
    }
    return isOuterSite ? "noopener noreferrer" : ""
  }, [isOuterSite, rel])

  return <a
    href={href}
    target={finalTarget}
    rel={finalRel}
    className={joinSpace(className, Styles.anchor)}
    {...props}
  >
    {children}{finalIcon}
  </a>
}
