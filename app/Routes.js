import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Gps from './containers/Gps';
import NoMatch from './containers/NoMatch';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/gps' component={Gps} />
    <Route path="*" component={NoMatch} />
  </Route>
);
