import deviceMatrix from './device-matrix.json';
import detect from './detect';

global.detect = detect;

/*
  Function: isSupported
  Description: The algorithm is inclusive, so we enumerate everything we don't support, after that everything is supported
  Explanation: First check OS constrains, if passed, move to special browser cases and then general constrains
*/
function isSupported() {
  const userBrowser = detect.browser.toLowerCase();
  const userBrowserVersion = parseFloat(detect.browserVersion);
  const userOS = detect.os ? detect.os.toLowerCase() : 'unknown';
  const userOSVersion = detect.osVersion === 'Unknown' ? Number.MAX_SAFE_INTEGER : parseFloat(detect.osVersion);

  if (detect.isBot) {
    return true;
  }

  const supportedOsVersion = deviceMatrix[userOS];
  const supportedBrowserVersion = deviceMatrix[userBrowser];

  const supportedVersion = supportedBrowserVersion || supportedOsVersion;

  if (supportedVersion) {
    if (supportedOsVersion !== undefined) {
      if (userOSVersion < supportedOsVersion) {
        return false;
      }
    }

    if (supportedBrowserVersion !== undefined) {
      /* Special contrains here */

      if (userBrowserVersion < supportedBrowserVersion) {
        return false;
      }
    }
  }

  return true;
}

function getBrowserInformation() {
  return `
    browser: ${detect.browser},
    browser version: ${detect.browserVersion},
    os: ${detect.os},
    os version: ${detect.osVersion},
    ua: ${navigator.userAgent}
  `;
}

export { isSupported, getBrowserInformation };
