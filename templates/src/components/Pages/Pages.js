import React from 'react';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Pages.css';
import checkProps from '../../util/check-props';
import routes from '../../routes';

class Pages extends React.PureComponent {
  matchPath = path => matchPath(window.location.pathname, path);

  renderRoute = () => {
    return routes
      .filter(({ path }) => this.matchPath(path))
      .map(({ Component, key, props }) => <Component key={key} {...props} history={this.props.history} />);
  };

  render() {
    return (
      <main className={classnames(`Pages`, this.props.className)} role="main">
        {this.renderRoute()}
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
