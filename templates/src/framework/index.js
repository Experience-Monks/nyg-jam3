import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { device, browser } from '@jam3/detect';
import store, { history } from '../redux';

import App from '../components/App/App';

let defaultAppComponent = <App />;

if (process.env.NODE_ENV !== 'production') {
  const AppContainer = require('react-hot-loader').AppContainer;
  defaultAppComponent = (
    <AppContainer>
      <App />
    </AppContainer>
  );
}

export default function() {
  const target = document.getElementById('root');
  const classes = [device.isMobile ? 'mobile' : '', device.getType(), browser.getName()].filter(className =>
    Boolean(className)
  );

  document.body.className = [...document.body.className.split(' '), ...classes].filter(Boolean).join(' ');

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{Component}</ConnectedRouter>
      </Provider>,
      target
    );
  };

  render(defaultAppComponent);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('../components/App/App', () => {
      render(defaultAppComponent);
    });
  }
}
