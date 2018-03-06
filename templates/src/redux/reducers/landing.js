import keys from '../keys';

export const landingLoaded = (state = false, action) => {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return action.loaded;
    default:
      return state;
  }
};
