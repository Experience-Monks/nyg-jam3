import keys from '../keys';

// Reducers
export function layoutReducer(state = [], action) {
  switch (action.type) {
    case keys.SET_LAYOUT:
      return action.layout;
    default:
      return state;
  }
}

export function mobileLayoutReducer(state = false, { type, isMobileLayout }) {
  return type === keys.SET_IS_MOBILE_LAYOUT ? isMobileLayout : state;
}

export function phoneLayoutReducer(state = false, { type, phoneLayout }) {
  return type === keys.SET_IS_PHONE_LAYOUT ? phoneLayout : state;
}

export function tabletLayoutReducer(state = false, { type, tabletLayout }) {
  return type === keys.SET_IS_TABLET_LAYOUT ? tabletLayout : state;
}

// Action Creators
export function setLayout(layout) {
  return {
    type: keys.SET_LAYOUT,
    layout
  };
}

export function setIsMobileLayout(isMobileLayout) {
  return {
    type: keys.SET_IS_MOBILE_LAYOUT,
    isMobileLayout
  };
}

export function setIsPhoneLayout(phoneLayout) {
  return {
    type: keys.SET_IS_PHONE_LAYOUT,
    phoneLayout
  };
}

export function setIsTabletLayout(tabletLayout) {
  return {
    type: keys.SET_IS_TABLET_LAYOUT,
    tabletLayout
  };
}
