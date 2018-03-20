import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { matchPath } from 'react-router';
import usePassiveEvent from '../../util/use-passive-event';
import settings from '../../data/settings';
import { setWindowSize } from '../../redux/actions/app';
import routes from '../../routes';

class App extends Component {
  componentWillMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }
    window.addEventListener('resize', debounce(this.onAppResize, settings.resizeDebounceTime), usePassiveEvent());
    this.onAppResize();
  }

  onAppResize = () => {
    this.props.setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  matchPath = path => matchPath(window.location.pathname, path);

  renderRoute = () => {
    return routes
      .filter(({ path }) => this.matchPath(path))
      .map(({ Component, key, props }) => <Component key={key} {...props} history={this.props.history} />);
  };

  render() {
    return <div id="App">{this.renderRoute()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state.currentRoute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWindowSize: val => dispatch(setWindowSize(val))
  };
};

App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
