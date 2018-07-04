import routeKeys from '../routes/keys';

// TransitionGroup v.2 requires the timeout to be passes down.
// Each page may have `in` and `exit` duration where `exit` duration controls when the page is removed from the DOM
// so it is required to have that specified here for each page

const transitionsData = {
  [`${routeKeys.Landing}`]: {
    exit: 300 // this number should match total duration inside animateOut function of the Landing page
  },
  [`${routeKeys.About}`]: {
    exit: 300 // this number should match total duration inside animateOut function of the About page
  }
};

export function getEnterTransitionDuration(path) {
  path = '/' + path.split('/')[1];
  return transitionsData[path] ? transitionsData[path].enter : 0;
}

export function getExitTransitionDuration(path) {
  path = '/' + path.split('/')[1];
  return transitionsData[path] ? transitionsData[path].exit : 0;
}

export function getTransitionDuration(path) {
  path = '/' + path.split('/')[1];
  return transitionsData[path] || 0;
}
