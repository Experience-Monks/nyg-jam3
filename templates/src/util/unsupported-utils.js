import deviceMatrix from './device-matrix.json';
import detect from './detect';

global.detect = detect;

/**
 * Returns if the current browser is supported by the web app
 * The algorithm is inclusive, so we enumerate everything we don't support, after that everything is supported
 *
 * @returns {Boolean} supported
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

/**
 * Print current browser information
 *
 * @returns {String} Browser|Browser Version|OS|OS Version|UA
 */
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
