import React, { Fragment, lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Transition } from 'react-transition-group';
import { Footer, HamburgerMenu, MainTopNav, PageOverlay } from '@jam3/react-ui';
import { device } from '@jam3/detect';
import checkProps from '@jam3/react-check-extra-props';
import 'default-passive-events';
import { withNamespaces } from 'react-i18next';

import Pages from '../../components/Pages/Pages';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import PrefetchLink from '../../components/PrefetchLink/PrefetchLink';

import { setPreviousRoute, setWindowSize, setLayout, batchActions } from '../../redux/modules/app';
import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

import settings from '../../data/settings';
import rotateScreenData from '../../data/rotate-screen';
import layout from '../../util/layout';
import lockBodyScroll from '../../util/lock-body-scroll';
import preloadAssets from '../../data/preload-assets';

const LazyRotateScreen =
  device.isMobile &&
  lazy(() =>
    import('@jam3/react-ui').then(module => {
      return { ...module, default: module.RotateScreen };
    })
  );

const LazyPreloader = lazy(() => import('../../components/Preloader/Preloader'));

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
    if (prevProps.isMobileMenuOpen !== this.props.isMobileMenuOpen) {
      this.props.isMobileMenuOpen ? lockBodyScroll.lock() : lockBodyScroll.unlock();
    }

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
              {...this.props.copy.menus.mainNav}
              showHamburger={!this.props.layout.large}
              isMobileMenuOpen={this.props.isMobileMenuOpen}
              setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
              linkComponent={PrefetchLink}
            />
            {!this.props.layout.large && (
              <Fragment>
                <PageOverlay
                  isShowing={this.props.isMobileMenuOpen}
                  onClick={() => this.props.setIsMobileMenuOpen(false)}
                />
                <HamburgerMenu
                  {...this.props.copy.menus.hamburgerMenu}
                  isMobileMenuOpen={this.props.isMobileMenuOpen}
                  setIsMobileMenuOpen={this.props.setIsMobileMenuOpen}
                  linkComponent={PrefetchLink}
                />
              </Fragment>
            )}
            <Pages />
            <Footer {...this.props.copy.menus.footer} linkComponent={PrefetchLink}>
              <LanguageSwitcher lang={this.props.lang} />
            </Footer>
          </Fragment>
        )}
        <Suspense fallback={<div className="loading" />}>
          {device.isMobile && <LazyRotateScreen {...rotateScreenData} />}
          {Boolean(preloadAssets.length) && (
            <Transition in={!this.props.ready} timeout={0}>
              {state => state !== 'exited' && <LazyPreloader transitionState={state} />}
            </Transition>
          )}
        </Suspense>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const copy = props.i18n.store.data[state.i18next.language];
  return {
    layout: state.layout,
    ready: preloadAssets.length ? state.preloader.ready : true,
    isMobileMenuOpen: state.isMobileMenuOpen,
    copy: copy ? copy[state.i18next.defaultNS] : {},
    lang: state.i18next.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPreviousRoute: val => dispatch(setPreviousRoute(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)])),
    setIsMobileMenuOpen: val => dispatch(setIsMobileMenuOpen(val))
  };
};

App.propTypes = checkProps(
  {
    layout: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
    setPreviousRoute: PropTypes.func.isRequired,
    isMobileMenuOpen: PropTypes.bool.isRequired,
    setIsMobileMenuOpen: PropTypes.func.isRequired,
    setLayout: PropTypes.func.isRequired,
    copy: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    lang: PropTypes.string
  },
  ['tReady', 'i18n', 't', 'lng', 'i18nOptions', 'defaultNS', 'reportNS']
);

App.defaultProps = {};

export default withRouter(
  withNamespaces('default')(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
);
