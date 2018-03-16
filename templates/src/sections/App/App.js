import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import Landing from '../Landing/Landing';
import { AsyncAbout, AsyncNotFound } from '../../util/async-section-handler';

import RotateScreen from '../../components/Rotate/Rotate';

import settings from '../../data/settings';
import appResize from '../../util/app-resize';
import detect from '../../util/detect';
import usePassiveEvent from '../../util/use-passive-event';

import { setWindowSize } from '../../redux/actions/app';

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
    appResize();
  };

  routeRender = () => {
    return (
      <React.Fragment>
        <section id="sections" key="sections">
          <Switch>
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/about" component={AsyncAbout} />
            <Route component={AsyncNotFound} />
          </Switch>
        </section>
        {detect.isMobile && <RotateScreen key="rotate" />}
      </React.Fragment>
    );
  };

  render() {
    return (
      <Router>
        <Route render={this.routeRender} />
      </Router>
    );
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
