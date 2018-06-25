import detect from '../util/detect';

// TODO: replace this constant when adding global constants
const ASSETS_PATH = process.env.PUBLIC_URL + '/assets/';

/**
 * Manipulate preload assets list here
 *
 * @const {array} GLOBAL_ASSETS (Keep an assets list for across all platform)
 * @const {array} MOBILE_ASSETS (Keep an assets list for phone)
 * @const {array} TABLET_ASSETS (Keep an assets list for tablet)
 * @const {array} DESKTOP_ASSETS (Keep an assets list for desktop)
 */
const GLOBAL_ASSETS = [
  `${ASSETS_PATH}button-rollover.mp3`,
  `${ASSETS_PATH}button-click.mp3`,
  `${ASSETS_PATH}button-sprite.mp3`
];
const MOBILE_ASSETS = [];
const TABLET_ASSETS = [];
const DESKTOP_ASSETS = [];

export default [
  ...GLOBAL_ASSETS,
  ...(detect.isPhone ? MOBILE_ASSETS : []),
  ...(detect.isTablet ? TABLET_ASSETS : []),
  ...(detect.isDesktop ? DESKTOP_ASSETS : [])
];
