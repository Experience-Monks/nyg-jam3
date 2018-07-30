import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import logo from './assets/logo.svg';

import './Landing.css';

import BaseLink from '../../components/BaseLink/BaseLink';

import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';
import { default as Transition } from '../PagesTransitionWrapper';
import { wait } from '../../util/basic-functions';
import sanitizer from '../../util/sanitizer';

type Props = {
  className?: string,
  transitionState: string,
  previousRoute: string,
  loaded: boolean,
  setLandingLoaded: Function
};

type State = {};

class Landing extends React.PureComponent<Props, State> {
  static defaultProps: Object;
  container: ?HTMLElement;

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
    return (
      <section className={classnames('Landing', this.props.className)} ref={el => (this.container = el)}>
        <header className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h1 className="Landing-title">Welcome to React</h1>
        </header>
        <p className="Landing-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p
          className="dangerous-sample"
          dangerouslySetInnerHTML={{ __html: sanitizer('<p>Script inside <img src=x onerror=alert(1)></p>') }}
        />
        <BaseLink link="/about">About</BaseLink>
      </section>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Transition(Landing));
