import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { i18nextReducer } from 'i18next-redux-languagedetector';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import keys from './keys';

import reducerRegistry from './reducer-registry';

import preloaderReducer from './modules/preloader';
import mainNavReducer from './modules/main-nav';

import { windowSizeReducer, previousRouteReducer, layoutReducer } from './modules/app';

let store;
const initialState = {};
const enhancers = [];

// Reducers
const defaultReducers = {
  i18next: i18nextReducer,
  preloader: preloaderReducer,
  windowSize: windowSizeReducer,
  previousRoute: previousRouteReducer,
  layout: layoutReducer,
  isMobileMenuOpen: mainNavReducer,
  routing: routerReducer
};

const enableBatchActions = reducers => {
  return function(state, action) {
    switch (action.type) {
      case keys.BATCH_ACTIONS:
        return action.actions.reduce(reducers, state);
      default:
        return reducers(state, action);
    }
  };
};

const combine = reducers => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return enableBatchActions(combineReducers(reducers));
};

function createInitialReducer() {
  reducerRegistry.reducers = defaultReducers;
  return combine(defaultReducers);
}

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

// Enhancers
const composedEnhancers = composeWithDevTools(...enhancers);

// Configure Store
export const history = createHistory();

export default function configureStore(initialState = initialState) {
  store = createStore(createInitialReducer(), initialState, composedEnhancers);
  return store;
}
