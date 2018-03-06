import keys from '../keys';

export const pageLoaded = (state = false, action) => {
  switch (action.type) {
    case keys.SITE_LOADED:
      return action.loaded;
    default:
      return state;
  }
};
