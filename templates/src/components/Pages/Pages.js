import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Landing from '../../pages/Landing/Landing';
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
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/about" component={AsyncAbout} />
          <Route component={AsyncNotFound} />
        </Switch>
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
