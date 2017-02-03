import React from 'react'

const Root = props => {
  const head = props.head

  return (
    <html>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body id="cruz-app">
        <div id='root' dangerouslySetInnerHTML={{__html: props.content}} />
        {renderEnvironment()}
        {renderInitialState(props)}
        {head.script.toComponent()}
        <script src={process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ? '/app.min.js' : '/app.js'}></script>
      </body>
    </html>
  )
}

const renderInitialState = (props) => {
  if (props.initialState) {
    const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(props.initialState)}`
    return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
  }
}

const renderEnvironment = () => {
  const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`
  return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
}

export default Root
