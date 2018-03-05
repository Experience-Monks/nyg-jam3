import 'normalize.css';

import framework from './framework';
import * as serviceWorker from './serviceWorker';
import './util/unsupported';

import './style/global.css';

if (process.env.NODE_ENV !== 'production' && !window.location.href.includes('?nostat')) require('./util/stats')();

init();
serviceWorker.register();

function init() {
  framework();
}
