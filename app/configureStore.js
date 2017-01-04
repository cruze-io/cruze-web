import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'
const isClient = typeof document !== 'undefined'
import * as modules from './modules'

let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore)

let enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
  )
)

if (isClient) {
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware
    )
  )
}

export default function configureStore(initialState) {
  const reducer = combineReducers({...modules})
  const state = Immutable.fromJS(initialState)
  const store = reducer(state)

  return createStore(
    reducer,
    store,
    enhancer
  )

  if (isClient) {
    Reactotron.addReduxStore(store)
  }

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
