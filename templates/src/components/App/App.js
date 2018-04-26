import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Pages from '../../components/Pages/Pages';
import RotateScreen from '../../components/Rotate/Rotate';

import detect from '../../util/detect';
import compose from '../../util/compose';
import { withContext as withAppContext } from '../../contexts/app';
import { withContext as withLayoutContext } from '../../contexts/layout';

class App extends React.PureComponent {
  componentDidMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Pages />
        {detect.isMobile && <RotateScreen />}
      </Fragment>
    );
  }
}

App.defaultProps = {};

export default compose(withRouter, withAppContext, withLayoutContext)(App);
