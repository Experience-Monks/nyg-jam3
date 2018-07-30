import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './About.css';

import BaseLink from '../../components/BaseLink/BaseLink';

import { default as Transition } from '../PagesTransitionWrapper';
import { wait } from '../../util/basic-functions';
import animate from '../../util/gsap-animate';

import type { TransitionStates } from '../PagesTransitionWrapper';

type Props = {
  className?: string,
  transitionState: TransitionStates,
  previousRoute: string
};

type State = {};

class About extends React.PureComponent<Props, State> {
  static defaultProps: Object;
  container: ?HTMLElement;

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
    return (
      <section className={classnames('About', this.props.className)} ref={el => (this.container = el)}>
        <h1>About</h1>
        <BaseLink link="/">Home</BaseLink>
      </section>
    );
  }
}

About.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Transition(About));
