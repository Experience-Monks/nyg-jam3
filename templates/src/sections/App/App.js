import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Landing from '../Landing/Landing';

import RotateScreen from '../../components/Rotate/Rotate';

import detect from '../../util/detect';

import { pageLoaded } from '../../redux/actions/app';

class App extends Component {
  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }
  }

  componentDidMount() {
    this.props.pageLoaded(true);
  }

  routeRender = () => {
    return [
      <section id="sections" key="sections">
        <Switch>
          <Route exact={true} path="/" component={Landing} />
        </Switch>
      </section>,
      detect.isMobile && <RotateScreen key="rotate" />
    ];
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
    pageLoaded: val => dispatch(pageLoaded(val))
  };
};

App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
