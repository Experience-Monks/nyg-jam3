import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import { withNamespaces } from 'react-i18next';

import './Landing.scss';

import Transition from '../PagesTransitionWrapper';
import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';

class Landing extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setLandingLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  render() {
    const { t } = this.props;
    return (
      <section className={classnames('Landing', this.props.className)} ref={el => (this.container = el)}>
        <header className="Landing-header">
          <h1 className="Landing-title">{t('pages.landing.header')}</h1>
        </header>
        <section className="Landing-intro">
          <h2>{t('pages.landing.intro.title')}</h2>
          <div>{t('pages.landing.intro.description')}</div>
        </section>
        <section className="Landing-source">
          <h2>{t('pages.landing.source.title')}</h2>
          <div dangerouslySetInnerHTML={{ __html: t('pages.landing.source.description') }} />
        </section>
      </section>
    );
  }
}

Landing.propTypes = checkProps(
  {
    className: PropTypes.string,
    transitionState: PropTypes.string.isRequired,
    previousRoute: PropTypes.string,
    loaded: PropTypes.bool,
    setLandingLoaded: PropTypes.func
  },
  ['tReady', 'i18n', 't', 'lng', 'i18nOptions', 'defaultNS', 'reportNS']
);

Landing.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.landingLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLandingLoaded: val => dispatch(setLandingLoaded(val))
  };
};

Landing.defaultProps = {};

export default withNamespaces('default')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transition(Landing))
);
