import React, {
  Dispatch, useEffect, useState,
} from "react"
import {
  Button, notification,
} from "antd"
import { useDispatch } from "react-redux"

import { Action } from "@Src/store/globalSettings"

interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{
    outcome: "installed" | "dismissed";
    platform: "web" | "android" | "";
  }>;
  prompt(): Promise<void>;
}

export function Pwa() {
  const dispatch = useDispatch<Dispatch<Action>>()
  const [isInstalled, setIsInstalled] = useState(true)
  const [isNewVersionInstalled, setIsNewVersionInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>()

  // 注册 service worker 并记录是否加载新版本
  useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register("./service-worker.js").then((registration) => {
        console.log("service worker registed")
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  setIsNewVersionInstalled(true)
                }
              }
            })
          }
        })
      }).catch((registrationError) => {
        console.error("SW registration failed: ", registrationError)
      })
    } else {
      console.error("serviceWorker not supported")
    }
  }, [])

  // 将 BeforeInstallPromptEvent 保存下来以供后续使用
  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt)
    }
  }, [])

  // 通知加载新版本
  useEffect(() => {
    if (isNewVersionInstalled) {
      const key = `notification-${Date.now()}`
      const onClose = () => {
        setIsNewVersionInstalled(false)
      }

      notification.info({
        duration: null,
        placement: "bottomRight",
        message: "发现新版本",
        description: "新版本已加载完成",
        key,
        onClose,
        btn: <>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              // 需要关闭 notification, 因为 window.location.reload 可能被阻止
              notification.close(key)
              window.location.reload()
            }}
          >
            启用新版本
          </Button>
        </>,
      })
    }
  }, [isNewVersionInstalled])

  // pwa app installed
  useEffect(() => {
    setIsInstalled(window.matchMedia(`(display-mode: ${process.env.pwaDisplayMode || "standalone"})`).matches)

    const onAppInstalled = () => {
      setIsInstalled(true)
    }

    window.addEventListener("appinstalled", onAppInstalled)

    return () => {
      window.removeEventListener("appinstalled", onAppInstalled)
    }
  }, [])

  useEffect(() => {
    dispatch({
      type: "@globalSettings/deferredPrompt",
      value: !isInstalled && deferredPrompt ? deferredPrompt : undefined,
    })
  }, [deferredPrompt, dispatch, isInstalled])

  return <></>
}
