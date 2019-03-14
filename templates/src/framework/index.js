import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { device, browser } from '@jam3/detect';
import { I18nextProvider } from 'react-i18next';
import { languageChange } from 'i18next-redux-languagedetector';

import configureStore, { history } from '../redux';
import configureI18n from '../localization';

import App from '../components/App/App';

export default function() {
  const target = document.getElementById('root');
  const classes = [device.isMobile ? 'mobile' : '', device.getType(), browser.getName()].filter(className =>
    Boolean(className)
  );

  document.body.className = [...document.body.className.split(' '), ...classes].filter(Boolean).join(' ');

  // configure localization
  const i18nextConfig = {
    language: null,
    whitelist: ['en', 'ru'],
    ns: ['default'],
    defaultNS: 'default'
  };

  const store = configureStore({
    i18next: i18nextConfig
  });

  const i18n = configureI18n({
    i18nextConfig,
    redux: {
      lookupRedux: () => store.getState().i18next,
      cacheUserLanguageRedux: language => store.dispatch(languageChange(language))
    }
  });

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <I18nextProvider i18n={i18n}>{Component}</I18nextProvider>
        </ConnectedRouter>
      </Provider>,
      target
    );
  };

  render(<App />);
}
