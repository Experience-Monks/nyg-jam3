import bowser from 'bowser';

const ua = window.navigator.userAgent.toLowerCase();
const bots = [
  'facebookexternalhit',
  'linkedinbot',
  'google (+https://developers.google.com/+/web/snippet/)',
  'facebot',
  'https://developers.google.com/+/web/snippet/',
  'twitterbot',
  'tumblr',
  'googlebot'
];

const checkBot = () => Boolean(bots.filter(bot => ua.indexOf(bot.toLowerCase()) !== -1).length);
const checkVendor = () => (window.navigator.vendor ? window.navigator.vendor.toLowerCase() : '');
const checkOSVersion = () => bowser.osversion;
const checkOSMajorVersion = () => parseInt(bowser.osversion, 10);
const checkBrowserVersion = () => bowser.version;
const checkBrowserMajorVersion = () => parseInt(bowser.version, 10);
const checkDevicePixelRatio = () => window.devicePixelRatio;
const checkFacebook = () => /fban|fbav/.test(ua);
const checkTwitter = () => /twitter/.test(ua);
const checkInstagram = () => /instagram/.test(ua);
const checkPinterest = () => /pinterest/.test(ua);

// Bot flags
const isBot = checkBot();

// OS flags
const isiOS = bowser.ios === true;
const isAndroid = bowser.android === true;
const isFirefoxOS = bowser.firefoxos === true;
const isWindowsPhone = bowser.windowsphone === true;
const isBlackberry = bowser.blackberry === true;
const isMac = bowser.mac === true;
const isWindows = bowser.windows === true;
const isLinux = bowser.linux === true;
const isChromeOS = bowser.chromeos === true;

// Device flags
const isPhone = bowser.mobile === true;
const isTablet = bowser.tablet === true;
const isMobile = isPhone || isTablet;
const isDesktop = !isMobile;
const isiPhone = isiOS && bowser.iphone === true;
const isiPad = isiOS && bowser.ipad === true;
const isiPod = isiOS && bowser.ipod === true;

// Browser flags
const isChrome = bowser.chrome === true;
const isFirefox = bowser.firefox === true;
const isSafari = bowser.safari === true;
const isEdge = bowser.msedge === true;
const isIE = bowser.msie === true;
const isOpera = bowser.opera === true;

const checkDevice = () => {
  if (isPhone) return 'phone';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  return '';
};

const checkOSName = () => {
  if (isiOS) return 'ios';
  if (isAndroid) return 'android';
  if (isFirefoxOS) return 'firefoxos';
  if (isWindowsPhone) return 'windowsphone';
  if (isBlackberry) return 'blackberry';
  if (isMac) return 'mac';
  if (isWindows) return 'windows';
  if (isLinux) return 'linux';
  if (isChromeOS) return 'chromeos';
  return '';
};

const checkBrowserName = () => {
  if (isChrome) return 'chrome';
  if (isFirefox) return 'firefox';
  if (isSafari) return 'safari';
  if (isEdge) return 'edge';
  if (isIE) return 'ie';
  if (isOpera) return 'opera';
  return '';
};

// OS
const os = checkOSName();
const osVersion = checkOSVersion();
const osMajorVersion = checkOSMajorVersion();

// Browser
const browser = checkBrowserName();
const browserVersion = checkBrowserVersion();
const browserMajorVersion = checkBrowserMajorVersion();

// InAppBrowser flags
const isFacebook = checkFacebook();
const isTwitter = checkTwitter();
const isInstagram = checkInstagram();
const isPinterest = checkPinterest();

const checkInAppBrowser = () => {
  let isInAppBrowser = isFacebook || isTwitter || isInstagram || isPinterest;

  if (!isInAppBrowser) {
    isInAppBrowser = isiOS && osMajorVersion >= 11 && isSafari && typeof window.navigator.mediaDevices === 'undefined';
  }

  return isInAppBrowser;
};

const checkInAppBrowserVersion = () => {
  if (isiOS) return osMajorVersion;
  if (isAndroid) return browserMajorVersion;
  return 9999;
};

const isInAppBrowser = checkInAppBrowser();
const inAppBrowserVersion = checkInAppBrowserVersion();

// Orientation
const PORTRAIT = 'portrait';
const LANDSCAPE = 'landscape';

const checkOrientation = () => {
  if (typeof window.screen === 'object') {
    const orientationType =
      window.screen.msOrientation || (window.screen.orientation || window.screen.mozOrientation || {}).type;

    if (typeof orientationType === 'string') {
      return orientationType.split('-', 1)[0];
    }
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(orientation: portrait)').matches === true ? PORTRAIT : LANDSCAPE;
  }

  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return w < h ? PORTRAIT : LANDSCAPE;
};

const checkPortrait = () => checkOrientation() === PORTRAIT;
const checkLandscape = () => checkOrientation() === LANDSCAPE;

// Other
const vendor = checkVendor();
const device = checkDevice();

const getClasses = () => [isMobile ? 'mobile' : '', device, os, browser].filter(className => Boolean(className));

const classes = getClasses();
const devicePixelRatio = checkDevicePixelRatio();

// Create default object
const detect = {
  // Bot flags
  isBot,
  // Device flags
  isPhone,
  isTablet,
  isMobile,
  isDesktop,
  isiPhone,
  isiPad,
  isiPod,
  // OS flags
  isiOS,
  isAndroid,
  isFirefoxOS,
  isWindowsPhone,
  isBlackberry,
  isMac,
  isWindows,
  isLinux,
  isChromeOS,
  // Browser flags
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
  isIE,
  isOpera,
  // InAppBrowser flags & version
  isFacebook,
  isTwitter,
  isInstagram,
  isPinterest,
  isInAppBrowser,
  inAppBrowserVersion,
  // OS
  os,
  osVersion,
  osMajorVersion,
  // Browser
  browser,
  browserVersion,
  browserMajorVersion,
  // Orientation
  PORTRAIT,
  LANDSCAPE,
  get orientation() {
    return checkOrientation();
  },
  get isPortrait() {
    return checkPortrait();
  },
  get isLandscape() {
    return checkLandscape();
  },
  // Other
  classes,
  vendor,
  device,
  devicePixelRatio,
  // Libraries
  bowser
};

// Named exports
export {
  // Bot flags
  isBot,
  // Device flags
  isPhone,
  isTablet,
  isMobile,
  isDesktop,
  isiPhone,
  isiPad,
  isiPod,
  // OS flags
  isiOS,
  isAndroid,
  isFirefoxOS,
  isWindowsPhone,
  isBlackberry,
  isMac,
  isWindows,
  isLinux,
  isChromeOS,
  // Browser flags
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
  isIE,
  isOpera,
  // InAppBrowser flags & version
  isFacebook,
  isTwitter,
  isInstagram,
  isPinterest,
  isInAppBrowser,
  inAppBrowserVersion,
  // OS
  os,
  osVersion,
  osMajorVersion,
  // Browser
  browser,
  browserVersion,
  browserMajorVersion,
  // Orientation
  PORTRAIT,
  LANDSCAPE,
  checkOrientation,
  checkPortrait,
  checkLandscape,
  // Other
  classes,
  vendor,
  device,
  devicePixelRatio,
  // Libraries
  bowser
};

// Default export
export default detect;
