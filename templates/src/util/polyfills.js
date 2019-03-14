import { polyfillLoader } from 'polyfill-io-feature-detection';
import noop from 'no-op';

const polyfillsList = [];

/**
 * Preload only required polyfills for features that aren't supported by the browser
 *
 * @param {function} [onCompleted=noop] - on load callback
 */
export default function(onCompleted = noop) {
  polyfillLoader({
    features: polyfillsList.join(),
    onCompleted
  });
}
