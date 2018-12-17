import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Pages.scss';

import checkProps from '../../util/check-props';
import { noop } from '../../util/basic-functions';
import routeKeys from '../../routes/keys';
import { getTransitionDuration } from '../../data/pages-transitions';

const Landing = lazy(() => import('../../pages/Landing/Landing'));
const About = lazy(() => import('../../pages/About/About'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

const Pages = ({ location, ...props }) => {
  return (
    <main className={classnames('Pages', props.className)} role="main">
      <TransitionGroup component={Fragment}>
        <Transition appear key={location.pathname} timeout={getTransitionDuration(location.pathname)}>
          {state => (
            <Switch location={location}>
              <Route
                exact
                path={routeKeys.Landing}
                component={
                  <Suspense fallback={noop}>
                    <Landing transitionState={state} />
                  </Suspense>
                }
              />
              <Route
                exact
                path={routeKeys.About}
                component={
                  <Suspense fallback={noop}>
                    <About transitionState={state} />
                  </Suspense>
                }
              />
              <Route component={NotFound} />
            </Switch>
          )}
        </Transition>
      </TransitionGroup>
    </main>
  );
};

Pages.propTypes = checkProps({
  className: PropTypes.string
});

Pages.defaultProps = {};

export default withRouter(Pages);
