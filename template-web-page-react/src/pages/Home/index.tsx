import React from "react"
import { Link } from "react-router-dom"
import { Button, Divider } from "antd"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { useRandomSoftColors } from "@Src/utils"
import SwitchLang from "@Src/components/SwitchLang"
import SwitchTransitionType from "@Src/components/SwitchTransitionType"
import { State } from "@Src/store"
import { ClearCacheForLocalhostOnly } from "@Src/components/ClearCacheForLocalhostOnly"

function Home() {
  const { t } = useTranslation()
  const [backgroundColor, color] = useRandomSoftColors()
  const { deferredPrompt } = useSelector((state: State) => state.globalSettings)

  return <div key="Home" style={{ padding: "10px" }}>
    <p style={{
      padding: ".5em 1em",
      fontSize: "2em",
      color,
      backgroundColor,
    }}>this is <strong>Home page</strong></p>
    <p>go to <Link to="/about" replace>About</Link></p>
    <p>go to <Link to="/not-exist-path" replace>not-exist-path</Link></p>
    <p>variable from process.env: process.env.APP_NAME is: {process.env.APP_NAME}</p>

    <Divider>Redux</Divider>
    <p>{t("declaration")} <SwitchLang /></p>
    <p>页面切换动画: <SwitchTransitionType /></p>
    {
      deferredPrompt && <p>
        <span>您还可以将本站 </span>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            if (deferredPrompt) {
              deferredPrompt.prompt()
            }
          }}
        >
          添加到桌面
        </Button>
      </p>
    }
    <ClearCacheForLocalhostOnly />
  </div>
}

export default Home
