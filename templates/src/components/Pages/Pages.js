import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Pages.scss';

import routeKeys from '../../routes/keys';
import { getTransitionDuration } from '../../data/pages-transitions';

const Landing = lazy(() => import(/* webpackChunkName: "Landing" */ '../../pages/Landing/Landing'));
const About = lazy(() => import(/* webpackChunkName: "About" */ '../../pages/About/About'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

const Pages = ({ location, ...props }) => {
  return (
    <main className={classnames('Pages', props.className)} role="main">
      <TransitionGroup component={Fragment}>
        <Transition appear key={location.pathname} timeout={getTransitionDuration(location.pathname)}>
          {state => (
            <Suspense fallback={<div className="loading" />}>
              <Switch location={location}>
                <Route exact path={routeKeys.Landing} render={() => <Landing transitionState={state} />} />
                <Route exact path={routeKeys.About} render={() => <About transitionState={state} />} />
                <Route render={() => <NotFound />} />
              </Switch>
            </Suspense>
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
