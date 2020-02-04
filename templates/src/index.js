import 'normalize.css';
import './style/global.scss';

import './util/unsupported';
import './util/polyfills';
import framework from './framework';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) require('@jam3/stats')();

framework();
serviceWorker.register();
