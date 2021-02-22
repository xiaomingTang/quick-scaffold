import {
  createStore, combineReducers, applyMiddleware,
} from "redux"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
// import logger from "redux-logger"

import {
  initState as globalSettingsInitState,
  reducer as globalSettingsReducer,
  Action as GlobalSettingsAction,
} from "./globalSettings"

const initState = {
  globalSettings: globalSettingsInitState,
}
export type State = typeof initState

const reducer = combineReducers({
  globalSettings: globalSettingsReducer,
})

const store = createStore(reducer, initState, applyMiddleware(
  thunk,
  // logger,
))

export type SyncAction = GlobalSettingsAction
export type AsyncAction<R> = ThunkAction<Promise<R>, State, null, SyncAction>

export type MixedDispatch = ThunkDispatch<State, null, SyncAction>

export default store
