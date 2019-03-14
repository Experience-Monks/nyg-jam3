import 'normalize.css';

import './util/unsupported';
import polyfills from './util/polyfills';
import framework from './framework';
import * as serviceWorker from './serviceWorker';

import './style/global.scss';

if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) require('@jam3/stats')();

polyfills();
framework();
serviceWorker.register();
