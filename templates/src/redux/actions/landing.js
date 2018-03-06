import keys from '../keys';

export function landingLoaded(loaded) {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}
