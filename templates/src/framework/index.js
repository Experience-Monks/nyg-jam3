import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../redux';
import { AppContainer } from 'react-hot-loader';

import App from '../sections/App/App';

import detect from '../util/detect';

export default function() {
  const target = document.getElementById('root');
  document.body.className = [...document.body.className.split(' '), ...detect.classes].join(' ');

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContainer>
            <App />
          </AppContainer>
        </ConnectedRouter>
      </Provider>,
      target
    );
  };

  render(App);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('../sections/App/App', () => {
      render(App);
    });
  }
}
