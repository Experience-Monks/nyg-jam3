import loadable from 'react-loadable';

const routes = [
  {
    key: 'About',
    Component: loadable({
      loader: () => import('../pages/About/About'),
      loading: () => null
    }),
    path: {
      path: '/about',
      exact: true
    }
  },
  {
    key: 'NotFound',
    Component: loadable({
      loader: () => import('../pages/NotFound/NotFound'),
      loading: () => null
    }),
    path: {
      path: '/notfound',
      exact: true
    }
  },
  {
    key: 'Landing',
    Component: loadable({
      loader: () => import('../pages/Landing/Landing'),
      loading: () => null
    }),
    path: {
      path: '/',
      exact: true
    }
  }
];

const routeKeys = routes.reduce((routeKeys, r) => {
  const key = r.key;
  routeKeys[key] = r.path.path;
  return routeKeys;
}, {});

export const RouteKeys = routeKeys;
export default routes;
