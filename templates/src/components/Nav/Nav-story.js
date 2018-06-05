import React from 'react';
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import createBrowserHistory from 'history/createBrowserHistory';

import Component from './Nav';

const history = createBrowserHistory();

storiesOf('Nav', module).add('Default', () => (
  <Router history={history}>
    <Route render={() => <Component />} />
  </Router>
));
