import React from "react"
import { IconButton, Typography, TypographyProps } from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"

export function randomMessageKey() {
  return `__MessageKey__${Date.now()}__${Math.random()}`
}

interface SimpleIconButtonProps {
  onClick?: () => void;
}

export function CloseIconButton({
  onClick,
}: SimpleIconButtonProps) {
  return <IconButton
    color="inherit"
    size="small"
    onClick={onClick}
  >
    <CloseIcon style={{ fontSize: "inherit" }} />
  </IconButton>
}

export function SimpleText({
  children,
  variant = "body1",
  ...props
}: TypographyProps) {
  return <Typography variant={variant} {...props}>
    {children}
  </Typography>
}
