import { Button, message, Popover } from "antd"
import React, { useMemo } from "react"

import { Anchor } from "@Src/components/Anchor"

export function ClearCacheForLocalhostOnly() {
  const isLocalhost = useMemo(() => window.location.hostname === "localhost", [])

  if (!isLocalhost) {
    return <></>
  }

  return <>
    <Button
      size="small"
      onClick={() => {
        caches.keys().then((cacheNames) => {
          Promise.all(cacheNames.map((name) => caches.delete(name)))
            .then(() => {
              message.success("清理缓存成功")
            })
            .catch((err) => {
              console.error(err)
              message.error("清理缓存失败, 请打开调试以查看失败原因")
            })
        })
      }}
    >
      清理该页面缓存
    </Button>
    <Popover
      title="为什么要清理缓存?"
      trigger={["click"]}
      placement="topLeft"
      content={<>
        <p>
          正常的 pwa 页面是不需要 主动 / 手动 清理缓存的,
          <br />
          详见
          <Anchor href="https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates">
            service worker 更新策略
          </Anchor>
          以及
          <Anchor href="https://jakearchibald.com/2016/caching-best-practices/">
            caching best practices
          </Anchor>
        </p>
        <p>
          但是在 localhost 环境下, 当我们退出该页面时, service worker 仍然会保留。
          <br />
          当我们下次在该 localhost 端口下运行其他页面时,
          <br />
          由于 index.html 被 service worker 缓存,
          <br />
          而新页面如果没有 service worker 或 service worker 不可用,
          <br />
          将会导致 index.html 得不到更新, 无法显示新页面
        </p>
      </>}
    >
      <Button size="small"> ? </Button>
    </Popover>
  </>
}
