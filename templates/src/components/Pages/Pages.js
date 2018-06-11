import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';
import routeKeys from '../../routes/keys';
import { getTransitionDuration } from '../../data/pages-transitions';
import './Pages.css';

import {
  AsyncLanding as Landing,
  AsyncAbout as About,
  AsyncNotFound as NotFound
} from '../../util/async-section-handler';

const Pages = ({ location, ...props }) => {
  return (
    <main className={classnames('Pages', props.className)} role="main">
      <TransitionGroup component={Fragment}>
        <Transition appear key={location.pathname} timeout={getTransitionDuration(location.pathname)}>
          {state => (
            <Switch location={location}>
              <Route exact path={routeKeys.Landing} render={() => <Landing transitionState={state} />} />
              <Route exact path={routeKeys.About} render={() => <About transitionState={state} />} />
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
