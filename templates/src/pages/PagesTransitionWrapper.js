import noop from 'no-op';
import { findDOMNode } from 'react-dom';
import wait from '@jam3/wait';

import { getExitTransitionDuration } from '../data/pages-transitions';

const transitionStates = {
  entering: 'entering',
  entered: 'entered',
  exiting: 'exiting',
  exited: 'exited'
};

const PagesTransitionWrapper = Class => {
  let container;
  const handleEnterTransition = async (previousRoute, onEnter = noop, onAppear = noop) => {
    if (previousRoute) {
      const transitionDuration = getExitTransitionDuration(previousRoute) || 0;
      onEnter(transitionDuration);
      await wait(transitionDuration);
      container.style.display = '';
    } else {
      container.style.display = '';
      onAppear();
    }
  };

  const handleLeaveTransition = (onLeave = noop) => {
    onLeave();
  };

  const componentDidMount = Class.prototype.componentDidMount;
  Class.prototype.componentDidMount = function() {
    componentDidMount && componentDidMount.call(this);

    container = findDOMNode(this);
    container.style.display = 'none';

    if (
      this.props.transitionState === transitionStates.entered ||
      this.props.transitionState === transitionStates.entering
    ) {
      handleEnterTransition(this.props.previousRoute, this.onEnter, this.onAppear);
    }
  };

  const componentDidUpdate = Class.prototype.componentDidUpdate;
  Class.prototype.componentDidUpdate = function() {
    componentDidUpdate && componentDidUpdate.apply(this, arguments);
    if (this.props.transitionState === transitionStates.entering) {
      handleEnterTransition(this.props.previousRoute, this.onEnter, this.onAppear);
    } else if (this.props.transitionState === transitionStates.exiting) {
      handleLeaveTransition(this.onLeave);
    }
  };

  return Class;
};

export default PagesTransitionWrapper;
