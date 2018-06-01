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
export default transitionsData;

export function getExitTransitionDuration(path) {
  return transitionsData[path].exit;
}

export function getTransitionDuration(path) {
  return transitionsData[path];
}
