import loadable from 'react-loadable';

export const AsyncLanding = loadable({
  loader: () => import('../sections/Landing/Landing'),
  loading: () => null
});
