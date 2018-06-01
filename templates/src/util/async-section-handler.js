import loadable from 'react-loadable';

// NOTE: if loading fn returns `null` instead,
// it will cause the page to `enter` right away and skip `entering` phase on appear (initial load)
const loading = () => '';

export const AsyncLanding = loadable({
  loader: () => import('../pages/Landing/Landing'),
  loading
});

export const AsyncAbout = loadable({
  loader: () => import('../pages/About/About'),
  loading
});

export const AsyncNotFound = loadable({
  loader: () => import('../pages/NotFound/NotFound'),
  loading
});
