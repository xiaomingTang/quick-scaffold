import React, { Suspense } from "react"

import { Loading } from "@Src/components/Fallback"

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */"@Src/pages/Home"))

export default function HomeRoute() {
  return <Suspense fallback={<Loading />}>
    <Home />
  </Suspense>
}
