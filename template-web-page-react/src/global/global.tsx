import React from "react"
import { message } from "antd"

import "@Src/polyfills/index"

import "@Src/i18n"

import "./global.less"

// 注册 service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then((registration) => {
      console.log("SW registered: ", registration)
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log("new version available")
                const cb = message.success(<>
                  新版本已准备好: <a onClick={() => {
                    window.location.reload()
                  }}>立即加载新版本</a> 或 <a onClick={() => cb()}>下次一定</a>
                </>, 0)
              }
            }
          })
        }
      })
    }).catch((registrationError) => {
      console.error("SW registration failed: ", registrationError)
    })
  })
} else {
  console.error("serviceWorker not supported")
}
