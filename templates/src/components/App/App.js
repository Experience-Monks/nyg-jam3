import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import Pages from '../../components/Pages/Pages';
import RotateScreen from '../../components/Rotate/Rotate';
import MainTopNav from '../MainTopNav/MainTopNav';

import { setPreviousRoute, setWindowSize, setLayout, batchActions } from '../../redux/modules/app';

import settings from '../../data/settings';
import detect from '../../util/detect';
import mediaQuery from '../../util/media-query';
import usePassiveEvent from '../../util/use-passive-event';

class App extends React.PureComponent {
  componentDidMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }

    window.addEventListener('resize', this.handleResize, usePassiveEvent());
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.setPreviousRoute(prevProps.location.pathname);
  }

  componentWillUnmount() {
    window.removeEventListener(this.handleResize);
  }

  handleResize = debounce(() => {
    this.props.setLayout(window.innerWidth, window.innerHeight, mediaQuery.layout);
  }, settings.resizeDebounceTime);

  render() {
    return (
      <Fragment>
        <MainTopNav />
        <Pages />
        {detect.isMobile && <RotateScreen />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setPreviousRoute: val => dispatch(setPreviousRoute(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)]))
  };
};

App.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
