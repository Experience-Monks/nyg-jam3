import { getExitTransitionDuration } from '../data/pages-transitions';
import { noop } from '../util/basic-functions';

const transitionStates = {
  entering: 'entering',
  entered: 'entered',
  exiting: 'exiting',
  exited: 'exited'
};

const PagesTransitionWrapper = Class => {
  const handleEnterTransition = (previousRoute, onEnter = noop, onAppear = noop) => {
    previousRoute ? onEnter(getExitTransitionDuration(previousRoute) || 0) : onAppear();
  };

  const handleLeaveTransition = (onLeave = noop) => {
    onLeave();
  };

  const componentDidMount = Class.prototype.componentDidMount;
  Class.prototype.componentDidMount = function() {
    componentDidMount && componentDidMount.call(this);

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

  const componentWillUnmount = Class.prototype.componentWillUnmount;
  Class.prototype.componentWillUnmount = function() {
    componentWillUnmount && componentWillUnmount.apply(this, arguments);

    // Scroll to the top of document on page unmount
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return Class;
};

export default PagesTransitionWrapper;
