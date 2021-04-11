import React from "react"
import { Link } from "react-router-dom"
import { Divider } from "antd"
import { useTranslation } from "react-i18next"

import SwitchLang from "@Src/components/SwitchLang"

function Home() {
  const { t } = useTranslation()

  return <div key="Home" style={{ padding: "10px" }}>
    <p>this is <strong>Home page</strong></p>
    <p>variable from process.env: process.env.APP_NAME is: {process.env.APP_NAME}</p>
    <p>go to <Link to="/about">About</Link></p>
    <p>go to <Link to="/not-exist-path">not-exist-path</Link></p>
    <Divider>language</Divider>
    <SwitchLang />
    <p>{t("name")}: xiaoming</p>
    <p>{t("age")}: 18</p>
  </div>
}

export default Home
