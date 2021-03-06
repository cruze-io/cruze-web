import React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Router, match, RouterContext, browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import routes from './Routes'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import configureStore from './configureStore'

const isClient = typeof document !== 'undefined'

if (isClient) {
  const store = configureStore(window.__INITIAL_STATE__)
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}>{routes}</Router>
    </Provider>,
    document.getElementById('root')
  )
}

function renderComponentWithRoot(Component, componentProps, store, headers) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
  )
  const head = Helmet.rewind()
  const initialState = store.getState().toJS()
  return '<!doctype html>\n' + renderToStaticMarkup(
    <Root
      content={componentHtml}
      initialState={initialState}
      head={head}
      radiumConfig={{userAgent: headers['user-agent']}}
    />
  )
}

function handleError(res, error) {
  res.status(500).send(error.message)
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search)
}

function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*'
}

function handleRoute(req, res, renderProps) {
  const store = configureStore()
  const status = routeIsUnmatched(renderProps) ? 404 : 200
  const readyOnAllActions = renderProps.components
    .filter((component) => component.readyOnActions)
    .map((component) => component.readyOnActions(store.dispatch, renderProps.params))
  Promise
    .all(readyOnAllActions)
    .then(() => res.status(status).send(renderComponentWithRoot(RouterContext, renderProps, store, req.headers)))
}

function serverMiddleware(req, res) {

  // Match is a function in the ReactRouter object imported at the top
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error)
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation)
    } else if (renderProps) {
      handleRoute(req, res, renderProps)
    } else {
      res.sendStatus(404)
    }
  })
}

export default serverMiddleware
