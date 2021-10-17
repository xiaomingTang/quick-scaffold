import VConsole from "vconsole"
import { isMobile } from "@Src/utils/device"

if (isMobile) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vConsole = new VConsole()
}
