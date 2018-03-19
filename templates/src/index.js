import 'normalize.css';

import './util/unsupported';
import framework from './framework';
import * as serviceWorker from './serviceWorker';

import './style/global.css';

import appResize from './util/app-resize';

if (process.env.NODE_ENV !== 'production' && !window.location.href.includes('?nostat')) require('./util/stats')();

init();
serviceWorker.register();

async function init() {
  await appResize();
  framework();
}
