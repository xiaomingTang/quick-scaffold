import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import {
  Button, Dropdown, Menu, message,
} from "antd"
import {
  CaretDownOutlined, LoadingOutlined,
} from "@ant-design/icons"
import i18n from "i18next"

import { State } from "@Src/store"
import { availableLangs, getLangTitle } from "@Src/i18n/datas"
import { Action } from "@Src/store/globalSettings"

export default function SwitchLang() {
  const [isLoading, setIsLoading] = useState(false)
  const { lang } = useSelector((state: State) => state.globalSettings)
  const dispatch = useDispatch<Dispatch<Action>>()

  if (availableLangs.length <= 1) {
    return <Button disabled size="small">
      {getLangTitle(lang)}
    </Button>
  }

  const menu = <Menu
    selectedKeys={[lang]}
    onClick={({ key }) => {
      if (isLoading) { return }
      const tarLang = key.toString()
      setIsLoading(true)
      i18n.changeLanguage(tarLang, (err) => {
        setIsLoading(false)
        if (!err) {
          dispatch({
            type: "@globalSettings/i18n",
            value: tarLang,
          })
        } else {
          message.error(<>can <strong>NOT</strong> load target language.</>)
        }
      })
    }}
  >
    {
      availableLangs.map((theLang) => (<Menu.Item key={theLang}>
        {getLangTitle(theLang)}
      </Menu.Item>))
    }
  </Menu>

  return <Dropdown disabled={isLoading} overlay={menu} trigger={["click"]}>
    <Button
      type="primary"
      size="small"
    >
      {getLangTitle(lang)}
      {
        isLoading ? <LoadingOutlined /> : <CaretDownOutlined />
      }
    </Button>
  </Dropdown>
}
