import 'normalize.css';

import './util/unsupported';
import './util/polyfills';
import framework from './framework';
import * as serviceWorker from './serviceWorker';

import './style/global.css';

if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) require('./util/stats')();

framework();
serviceWorker.register();
