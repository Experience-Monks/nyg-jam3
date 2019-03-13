import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../src/redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAddon, configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';
import { I18nextProvider } from 'react-i18next';

import BreakpointWrap from './BreakpointWrap';
import configureI18n from '../src/localization';
import { languageChange } from 'i18next-redux-languagedetector';

const req = require.context('../src', true, /\-story\.js$/);

const i18nextConfig = {
  language: null,
  whitelist: ['en-US', 'ru'],
  ns: ['default'],
  defaultNS: 'default'
};

const i18n = configureI18n({
  i18nextConfig,
  redux: {
    lookupRedux: () => store.getState().i18next,
    cacheUserLanguageRedux: language => store.dispatch(languageChange(language))
  }
});

const store = configureStore({
  i18next: i18nextConfig
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setAddon(JSXAddon);

addDecorator(withKnobs);
addDecorator(story => (
  <Provider store={store}>
    <Router>
      <BreakpointWrap>
        <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
      </BreakpointWrap>
    </Router>
  </Provider>
));

configure(loadStories, module);
