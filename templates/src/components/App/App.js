import React, { Fragment, lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Transition } from 'react-transition-group';
import { Footer, HamburgerMenu, MainTopNav, PageOverlay } from 'public-react-ui';
import 'default-passive-events';

import Pages from '../../components/Pages/Pages';
import Preloader from '../../components/Preloader/Preloader';

import { setPreviousRoute, setWindowSize, setLayout, batchActions } from '../../redux/modules/app';
import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

import settings from '../../data/settings';
import mainNavData from '../../data/main-nav';
import hamburgerNavData from '../../data/hamburger-menu';
import footerData from '../../data/footer';
import rotateScreenData from '../../data/rotate-screen';
import detect from '../../util/detect';
import layout from '../../util/layout';
import checkProps from '../../util/check-props';

const LazyRotateScreen =
  detect.isMobile &&
  lazy(() =>
    import('public-react-ui').then(module => {
      return { ...module, default: module.RotateScreen };
    })
  );

class App extends React.PureComponent {
  componentDidMount() {
    // Setup performance measure tooling
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }

    window.addEventListener('resize', this.handleResize);
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
  }, settings.resizeDebounceTime);

  render() {
    return (
      <Fragment>
        {this.props.ready && (
          <Fragment>
            <MainTopNav
              {...mainNavData}
              showHamburger={!this.props.layout.large}
              isMobileMenuOpen={this.props.isMobileMenuOpen}
              setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
            />
            {!this.props.layout.large && (
              <Fragment>
                <PageOverlay
                  isShowing={this.props.isMobileMenuOpen}
                  onClick={() => this.props.setIsMobileMenuOpen(false)}
                />
                <HamburgerMenu
                  {...hamburgerNavData}
                  isMobileMenuOpen={this.props.isMobileMenuOpen}
                  setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
                />
              </Fragment>
            )}
            <Pages />
            <Footer {...footerData} />
          </Fragment>
        )}
        {detect.isMobile && (
          <Suspense fallback={<div className="loading" />}>
            <LazyRotateScreen {...rotateScreenData} />
          </Suspense>
        )}
        <Transition in={!this.props.ready} timeout={0}>
          {state => state !== 'exited' && <Preloader transitionState={state} />}
        </Transition>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.layout,
    ready: state.preloader.ready,
    isMobileMenuOpen: state.isMobileMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPreviousRoute: val => dispatch(setPreviousRoute(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)])),
    setIsMobileMenuOpen: val => dispatch(setIsMobileMenuOpen(val))
  };
};

App.propTypes = checkProps({
  layout: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  setPreviousRoute: PropTypes.func.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired,
  setLayout: PropTypes.func.isRequired
});

App.defaultProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
