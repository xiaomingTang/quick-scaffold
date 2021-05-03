import { Modal, ModalProps } from "antd"
import React, { useState } from "react"

interface Props extends Exclude<ModalProps, "visible"> {
  content?: React.ReactNode;
}

export function useCustomModal({
  onOk, onCancel, content, ...props
}: Props = {}): [
  JSX.Element,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [modalVisible, setModalVisible] = useState(false)

  const modal = <Modal
    visible={modalVisible}
    closable
    maskClosable
    keyboard
    footer={null}
    onCancel={(e) => {
      if (onCancel) {
        onCancel(e)
      }
      setModalVisible(false)
    }}
    onOk={(e) => {
      if (onOk) {
        onOk(e)
      }
      setModalVisible(false)
    }}
    {...props}
  >
    {content}
  </Modal>

  return [
    modal,
    setModalVisible,
  ]
}
