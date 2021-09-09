import { hot } from "react-hot-loader/root"
import React, { Suspense } from "react"
import { Provider, useSelector } from "react-redux"
import {
  HashRouter as Router, Switch, Route, useLocation,
} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import { Pwa } from "@Src/pwa"

import store, { State } from "@Src/store/index"
import { PageContainer } from "@Src/components/PageContainer"
import { transitionClassNameMap } from "@Src/components/Transitions"
import { Loading } from "@Src/components/Fallback"

const About = React.lazy(() => import(/* webpackChunkName: "About" */"@Src/pages/About"))
const Home = React.lazy(() => import(/* webpackChunkName: "Home" */"@Src/pages/Home"))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */"@Src/pages/NotFound"))

function Contents() {
  const location = useLocation()
  const { transitionType } = useSelector((state: State) => state.globalSettings)

  return <TransitionGroup component={null}>
    <CSSTransition
      timeout={500}
      classNames={transitionClassNameMap[transitionType]}
      key={location.pathname}
      unmountOnExit
    >
      <Switch location={location}>
        <Route exact sensitive path="/about">
          <PageContainer>
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          </PageContainer>
        </Route>
        <Route exact sensitive path="/">
          <PageContainer>
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </PageContainer>
        </Route>
        <Route path="*">
          <PageContainer>
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          </PageContainer>
        </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
}

function AppRoute() {
  return <Provider store={store}>
    <Pwa />
    <Router>
      <Contents />
    </Router>
  </Provider>
}

export default hot(AppRoute)
