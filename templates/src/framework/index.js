import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../redux';

import App from '../components/App/App';

import detect from '../util/detect';

let defaultAppComponent = <App />;

if (process.env.NODE_ENV !== 'production') {
  var AppContainer = require('react-hot-loader').AppContainer;
  defaultAppComponent = (
    <AppContainer>
      <App />
    </AppContainer>
  );
}

export default function() {
  const target = document.getElementById('root');
  document.body.className = [...document.body.className.split(' '), ...detect.classes].join(' ');

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{defaultAppComponent}</ConnectedRouter>
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
