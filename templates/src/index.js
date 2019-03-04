import 'normalize.css';

import settings from './data/settings';
import './util/unsupported';
import loadPolyfills from './util/polyfills';
import framework from './framework';
import * as serviceWorker from './serviceWorker';

import './style/global.scss';

if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) require('@jam3/stats')();

loadPolyfills(init);

function init() {
  settings.preloadLinks && import('./util/preload-links');
  framework();
  serviceWorker.register();
}
