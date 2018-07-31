import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'mainNav';

// Reducer
export default function reducer(state: boolean = false, action: Object) {
  switch (action.type) {
    case keys.SET_IS_MOBILE_MENU_OPEN:
      return action.isOpen;
    default:
      return state;
  }
}

// Action Creator
export function setIsMobileMenuOpen(isOpen: boolean) {
  return {
    type: keys.SET_IS_MOBILE_MENU_OPEN,
    isOpen
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
