import keys from '../keys';

const preloadList = [
  './assets/sounds/button-click.mp3',
  './assets/sounds/button-rollover.mp3',
  './assets/sounds/button-sprite.mp3'
];

const defaultState = {
  preloader: {
    assets: preloadList,
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
