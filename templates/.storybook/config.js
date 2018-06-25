import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAddon, configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';

import BreakpointWrap from './BreakpointWrap';

const req = require.context('../src', true, /\-story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setAddon(JSXAddon);

addDecorator(withKnobs);
addDecorator(story => (
  <Provider store={store}>
    <Router>
      <BreakpointWrap>{story()}</BreakpointWrap>
    </Router>
  </Provider>
));


configure(loadStories, module);
