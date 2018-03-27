import keys from '../keys';

export function setIsMobileMenuOpen(isOpen) {
  return {
    type: keys.SET_IS_MOBILE_MENU_OPEN,
    isOpen
  };
}
