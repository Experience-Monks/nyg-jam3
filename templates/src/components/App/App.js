import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import Pages from '../../components/Pages/Pages';
import RotateScreen from '../../components/Rotate/Rotate';
import checkProps from '../../util/check-props';
import MainTopNav from '../MainTopNav/MainTopNav';

import { setPreviousRoute, setWindowSize, setLayout, batchActions } from '../../redux/modules/app';

import settings from '../../data/settings';
import detect from '../../util/detect';
import layout from '../../util/layout';
import usePassiveEvent from '../../util/use-passive-event';
import setGlobalFontsSze from '../../util/set-global-font-size';

class App extends React.PureComponent {
  componentDidMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }

    setGlobalFontsSze(window.innerWidth, window.innerHeight, this.props.layout.large);
    window.addEventListener('resize', this.handleResize, usePassiveEvent());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.setPreviousRoute(prevProps.location.pathname);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.props.setLayout(window.innerWidth, window.innerHeight, layout.all);
    setGlobalFontsSze(window.innerWidth, window.innerHeight, layout.large);
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
  return {
    layout: state.layout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPreviousRoute: val => dispatch(setPreviousRoute(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)]))
  };
};

App.propTypes = checkProps({
  layout: PropTypes.object.isRequired,
  setPreviousRoute: PropTypes.func.isRequired,
  setLayout: PropTypes.func.isRequired
});

App.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
