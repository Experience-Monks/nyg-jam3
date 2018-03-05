import framework from './framework';
import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV !== 'production' && !window.location.href.includes('?nostat')) require('./util/stats')();

init();

function init() {
  framework();
}

serviceWorker.register();
