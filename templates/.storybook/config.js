import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';

import { Provider } from '../src/contexts/layout';

const req = require.context('../src/components', true, /\-story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <Provider>
    <BrowserRouter>{story()}</BrowserRouter>
  </Provider>
));

configure(loadStories, module);
