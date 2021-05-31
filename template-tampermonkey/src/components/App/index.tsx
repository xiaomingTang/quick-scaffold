import { hot } from "react-hot-loader/root"
import React, {
  useCallback,
} from "react"
import {
  Button,
} from "@material-ui/core"
import {
  Settings as SettingsIcon,
} from "@material-ui/icons"
import {
  OptionsObject, useSnackbar,
} from "notistack"

import {
  CloseIconButton, SimpleText, randomMessageKey,
} from "@Src/utils/message"

import Styles from "./index.module.less"

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  
  const openMessage = useCallback((s: string, options: OptionsObject = {}) => {
    const MessageKey = randomMessageKey()
    return enqueueSnackbar(<SimpleText>{s}</SimpleText>, {
      key: MessageKey,
      autoHideDuration: 2000,
      action: <CloseIconButton onClick={() => closeSnackbar(MessageKey)} />,
      ...options,
    })
  }, [enqueueSnackbar, closeSnackbar])

  return <>
    <Button
      className={Styles.mainBtn}
      variant="contained"
      color="primary"
      onClick={() => {
        openMessage("hello tampermonkey", { variant: "info" })
      }}
      // 内容不加 nbsp, Button 会塌陷, 很难看
    >
      &nbsp;<SettingsIcon fontSize="inherit" />&nbsp;
    </Button>
  </>
}

export default hot(App)
