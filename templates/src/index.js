import framework from './framework';
import * as serviceWorker from './serviceWorker';

import './util/unsupported';

if (process.env.NODE_ENV !== 'production' && !window.location.href.includes('?nostat')) require('./util/stats')();

init();

function init() {
  framework();
}

serviceWorker.register();
