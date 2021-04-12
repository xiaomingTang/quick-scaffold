import { hot } from "react-hot-loader/root"
import React from "react"
import { Provider, useSelector } from "react-redux"
import {
  HashRouter as Router, Switch, Route, useLocation,
} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import "@Src/global/global"

import store, { State } from "@Src/store/index"
import { PageContainer } from "@Src/components/PageContainer"
import { transitionClassNameMap } from "@Src/components/Transitions"

import NotFound from "./NotFound"
import Home from "./Home"
import About from "./About"

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
            <About />
          </PageContainer>
        </Route>
        <Route exact sensitive path="/">
          <PageContainer>
            <Home />
          </PageContainer>
        </Route>
        <Route path="*">
          <PageContainer>
            <NotFound />
          </PageContainer>
        </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
}

function AppRoute() {
  return <Provider store={store}>
    <Router>
      <Contents />
    </Router>
  </Provider>
}

export default hot(AppRoute)
