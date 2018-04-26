import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../components/App/App';

import detect from '../util/detect';

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
  document.body.className = [...document.body.className.split(' '), ...detect.classes].join(' ');

  const render = Component => {
    ReactDOM.render(<BrowserRouter>{Component}</BrowserRouter>, target);
  };

  render(defaultAppComponent);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('../components/App/App', () => {
      render(defaultAppComponent);
    });
  }
}
