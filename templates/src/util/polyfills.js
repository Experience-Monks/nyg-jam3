/*
 * Preload only required polyfills for features that aren't supported by the browser
 */
import { polyfillLoader } from 'polyfill-io-feature-detection';
import settings from '../data/settings';

// add comma separated features to the list\
let polyfillsList = '';

if (settings.preloadLinks) {
  polyfillsList = 'IntersectionObserver';
}

export default function(onLoaded) {
  polyfillLoader({
    features: polyfillsList,
    onCompleted: onLoaded
  });
}
