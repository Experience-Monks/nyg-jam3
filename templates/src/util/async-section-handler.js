import loadable from 'react-loadable';

export const AsyncAbout = loadable({
  loader: () => import('../pages/About/About'),
  loading: () => null
});

export const AsyncNotFound = loadable({
  loader: () => import('../pages/NotFound/NotFound'),
  loading: () => null
});
