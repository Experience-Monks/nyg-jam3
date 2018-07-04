let alreadyTested = false;
let passiveSupported = false;

/**
 * Returns if passive event are supported
 *
 * @returns {Boolean} supported
 */
function isSupported() {
  if (alreadyTested) {
    return passiveSupported;
  } else {
    alreadyTested = true;

    // Test via a getter in the options object to see if the passive property is accessed
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {
      return passiveSupported;
    }
    return passiveSupported;
  }
}

/**
 * Passive event polyfill
 *
 * @returns {Object|Boolean} Passive event setup if is supported
 */
function usePassiveEvent() {
  return isSupported() ? { passive: true } : false;
}

export default usePassiveEvent;
