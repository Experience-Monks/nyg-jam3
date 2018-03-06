import loadable from 'react-loadable';

export const AsyncAbout = loadable({
  loader: () => import('../sections/About/About'),
  loading: () => null
});
