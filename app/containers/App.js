import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
const isClient = typeof document !== 'undefined';

class App extends Component {

  render() {
    return (
      <div>
        <Helmet
          title='MyApp'
          titleTemplate='MyApp - %s'
          meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'My super dooper dope app'}
          ]}
        />
        {isClient ? this.props.children : null}
      </div>
    );
  }
}

export default App;
