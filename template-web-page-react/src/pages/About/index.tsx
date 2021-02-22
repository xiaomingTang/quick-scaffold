import React from "react"
import { Link } from "react-router-dom"
import { Divider } from "antd"
import { useTranslation } from "react-i18next"

function About() {
  const { t } = useTranslation()

  return <div key="About" style={{ padding: "10px" }}>
    <p>this is <strong>About page</strong></p>
    <p>go to <Link to="/" replace>Home</Link></p>
    <Divider>language follow Home</Divider>
    <p>{t("name")}: xiaoming</p>
    <p>{t("age")}: 18</p>
  </div>
}

export default About
