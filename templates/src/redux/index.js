import { createStore, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducerRegistry from './reducer-registry';
import { layoutReducer, phoneLayoutReducer, mobileLayoutReducer, tabletLayoutReducer } from './modules/layout';

let store;
const initialState = {};
const enhancers = [];
const defaultReducers = {
  layout: layoutReducer,
  phoneLayout: phoneLayoutReducer,
  tabletLayout: tabletLayoutReducer,
  mobileLayout: mobileLayoutReducer,
  routing: routerReducer
};

// Reducers

const combine = reducers => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

function createInitialReducer() {
  reducerRegistry.reducers = defaultReducers;
  return combine(defaultReducers);
}

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

// Enhancers

const composedEnhancers = compose(...enhancers);

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// Configure Store

function configureStore() {
  store = createStore(createInitialReducer(), initialState, composedEnhancers);
  return store;
}

export const history = createHistory();

export default configureStore();
