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
                // eslint-disable-next-line no-alert
                if (window.confirm("新版本已准备好, 是否重启以加载新版本？")) {
                  window.location.reload()
                }
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
