import keys from '../keys';

export const layout = (state = [], action) => {
  switch (action.type) {
    case keys.SET_LAYOUT:
      return action.layout;
    default:
      return state;
  }
};

export const mobileLayout = (state = false, { type, isMobileLayout }) =>
  type === keys.SET_IS_MOBILE_LAYOUT ? isMobileLayout : state;

export const phoneLayout = (state = false, { type, phoneLayout }) =>
  type === keys.SET_IS_PHONE_LAYOUT ? phoneLayout : state;

export const tabletLayout = (state = false, { type, tabletLayout }) =>
  type === keys.SET_IS_TABLET_LAYOUT ? tabletLayout : state;
