import React, { Suspense } from "react"

import { Loading } from "@Src/components/Fallback"

const About = React.lazy(() => import(/* webpackChunkName: "About" */"@Src/pages/About"))

export default function AboutRoute() {
  return <Suspense fallback={<Loading />}>
    <About />
  </Suspense>
}
