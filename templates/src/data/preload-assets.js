import { device } from '@jam3/detect';

/**
 * Manipulate preload assets list here
 *
 * @const {array} GLOBAL_ASSETS (Keep an assets list for across all platform)
 * @const {array} MOBILE_ASSETS (Keep an assets list for phone)
 * @const {array} TABLET_ASSETS (Keep an assets list for tablet)
 * @const {array} DESKTOP_ASSETS (Keep an assets list for desktop)
 */
const GLOBAL_ASSETS = [];
const MOBILE_ASSETS = [];
const TABLET_ASSETS = [];
const DESKTOP_ASSETS = [];

export default [
  ...GLOBAL_ASSETS,
  ...(device.isPhone ? MOBILE_ASSETS : []),
  ...(device.isTablet ? TABLET_ASSETS : []),
  ...(device.isDesktop ? DESKTOP_ASSETS : [])
];
