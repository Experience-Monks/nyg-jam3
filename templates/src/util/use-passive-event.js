let alreadyTested = false;
let passiveSupported = false;

function isSupported() {
  if (alreadyTested) {
    return passiveSupported;
  } else {
    alreadyTested = true;

    // Test via a getter in the options object to see if the passive property is accessed
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}
    return passiveSupported;
  }
}

export default function usePassiveEvent() {
  return isSupported() ? { passive: true } : false;
}
