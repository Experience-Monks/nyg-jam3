import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Landing from '../../pages/Landing/Landing';
import Example from '../../pages/Example/Example.js';
import { AsyncNotFound, AsyncAbout } from '../../util/async-section-handler';

import './Pages.css';

import checkProps from '../../util/check-props';

class Pages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <main className={classnames(`Pages`, this.props.className)} role="main">
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="fade" timeout={300}>
            <Switch>
              <Route exact={true} path="/" component={Landing} />
              <Route exact={true} path="/about" component={AsyncAbout} />
              <Route exact={true} path="/example" component={Example} />
              <Route component={AsyncNotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </main>
    );
  }
}

Pages.propTypes = checkProps({
  className: PropTypes.string
});

Pages.defaultProps = {
  className: ''
};

export default withRouter(Pages);
