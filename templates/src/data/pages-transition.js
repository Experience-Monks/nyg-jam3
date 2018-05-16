import routeKeys from '../routes/keys';

const transitionsData = {
  [`${routeKeys.Landing}`]: {
    exit: 500
  },
  [`${routeKeys.About}`]: {
    exit: 500
  }
};
export default transitionsData;

export function getExitTransitionDuration(path) {
  return transitionsData[path].exit;
}

export function getTransitionDuration(path) {
  return transitionsData[path];
}
