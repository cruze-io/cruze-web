import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Landing from './containers/Landing';
import Gps from './containers/Gps';
import NoMatch from './containers/NoMatch';

export default (
  <Route component={App}>
    <Route path='/cruze' component={Gps} />
    <Route path='/landing' component={Landing} />
    <Route path="*" component={NoMatch} />
  </Route>
);
