import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../redux';

import App from '../components/App/App';

import detect from '../util/detect';

export default function() {
  const target = document.getElementById('root');
  document.body.className = [...document.body.className.split(' '), ...detect.classes].filter(Boolean).join(' ');

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{Component}</ConnectedRouter>
      </Provider>,
      target
    );
  };

  render(<App />);
}
