import { polyfillLoader } from 'polyfill-io-feature-detection';
import noop from 'no-op';

import settings from '../data/settings';

const polyfillsList = [];

if (settings.preloadLinks) {
  polyfillsList.push('IntersectionObserver');
}

/**
 * Preload only required polyfills for features that aren't supported by the browser
 *
 * @param {function} [onLoaded=noop] - on load callback
 */
export default function(onLoaded = noop) {
  polyfillLoader({
    features: polyfillsList.join(),
    onCompleted: onLoaded
  });
}
