import keys from '../keys';

export function pageLoaded(loaded) {
  return {
    type: keys.SITE_LOADED,
    loaded
  };
}
