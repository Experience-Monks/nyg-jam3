import keys from '../keys';

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
