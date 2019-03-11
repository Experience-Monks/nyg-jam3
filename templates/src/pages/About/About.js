import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import { withNamespaces } from 'react-i18next';

import './About.scss';

import Transition from '../PagesTransitionWrapper';
import PrefetchLink from '../../components/PrefetchLink/PrefetchLink';
import animate from '../../util/gsap-animate';

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
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
      <section className={classnames('About', this.props.className)} ref={el => (this.container = el)}>
        <h1>{t('pages.about.header')}</h1>
        <PrefetchLink link="/">{t('pages.about.homeLink.text')}</PrefetchLink>
      </section>
    );
  }
}

About.propTypes = checkProps(
  {
    className: PropTypes.string,
    transitionState: PropTypes.string.isRequired,
    previousRoute: PropTypes.string
  },
  ['tReady', 'i18n', 't', 'lng', 'i18nOptions', 'defaultNS', 'reportNS']
);

About.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default withNamespaces('default')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transition(About))
);
