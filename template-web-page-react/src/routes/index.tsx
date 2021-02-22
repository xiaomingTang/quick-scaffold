import { hot } from "react-hot-loader/root"
import React from "react"
import { Provider } from "react-redux"
import {
  HashRouter as Router, Switch, Route,
} from "react-router-dom"

import "@Src/global/global"

import store from "@Src/store/index"

import NotFound from "./NotFound"
import Home from "./Home"
import About from "./About"

function AppRoute() {
  return <Provider store={store}>
    <Router>
      <Switch>
        <Route exact sensitive path="/about">
          <About />
        </Route>
        <Route exact sensitive path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </Provider>
}

export default hot(AppRoute)
