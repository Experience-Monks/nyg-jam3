import keys from '../keys';

export const isMobileMenuOpen = (state = false, action) => {
  switch (action.type) {
    case keys.SET_IS_MOBILE_MENU_OPEN:
      return action.isOpen;
    default:
      return state;
  }
};
