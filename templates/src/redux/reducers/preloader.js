import keys from '../keys';

const defaultState = {
  preloader: {
    progress: 0
  }
};

export const ready = function(state = false, action) {
  switch (action.type) {
    case keys.SET_READY:
      return action.ready;
    default:
      return state;
  }
};

export const preloader = (state = defaultState.preloader, action) => {
  switch (action.type) {
    case keys.SET_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };

    default:
      return state;
  }
};
