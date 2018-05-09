import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';

import BreakpointWrap from './BreakpointWrap';

import '../src/util/breakpoint-handler';

const req = require.context('../src', true, /\-story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <Provider store={store}>
    <Router>
      <BreakpointWrap>{story()}</BreakpointWrap>
    </Router>
  </Provider>
));

configure(loadStories, module);
