import React from "react"
import { Link } from "react-router-dom"
import { Divider } from "antd"
import { useTranslation } from "react-i18next"

import { useRandomSoftColors } from "@Src/utils"
import SwitchLang from "@Src/components/SwitchLang"
import SwitchTransitionType from "@Src/components/SwitchTransitionType"

function About() {
  const { t } = useTranslation()
  const [backgroundColor, color] = useRandomSoftColors()

  return <div key="About" style={{ padding: "10px" }}>
    <p style={{
      padding: ".5em 1em",
      fontSize: "2em",
      color,
      backgroundColor,
    }}>this is <strong>About page</strong></p>
    <p>go to <Link to="/" replace>Home</Link></p>

    <Divider>Redux</Divider>
    <p>{t("declaration")} <SwitchLang /></p>
    <p>页面切换动画: <SwitchTransitionType /></p>
  </div>
}

export default About
