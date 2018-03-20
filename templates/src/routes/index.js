import loadable from 'react-loadable';
import RotateScreen from '../components/Rotate/Rotate';

const routes = [
  {
    key: 'About',
    Component: loadable({
      loader: () => import('../sections/About/About'),
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
      loader: () => import('../components/NotFound/NotFound'),
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
      loader: () => import('../sections/Landing/Landing'),
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
