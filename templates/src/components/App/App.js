import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import Pages from '../../components/Pages/Pages';
import RotateScreen from '../../components/Rotate/Rotate';

import settings from '../../data/settings';
import appResize from '../../util/app-resize';
import detect from '../../util/detect';
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

    window.addEventListener('resize', debounce(this.onAppResize, settings.resizeDebounceTime), usePassiveEvent());
    this.onAppResize();
  }

  onAppResize = () => {
    appResize();
  };

  render() {
    return (
      <Fragment>
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
  return {};
};

App.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
