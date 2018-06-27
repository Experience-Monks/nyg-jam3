import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './HamburgerButton.css';

import Button from '../Button/Button';

import animate from '../../util/gsap-animate';
import checkProps from '../../util/check-props';
import { noop } from '../../util/basic-functions';

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

const DURATION = 0.2;

const bars = [0, 1, 2].map(item => <span key={item} className={`bar ${item}`} />);

export default class HamburgerButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.bars = [...this.container.querySelectorAll('.bar')];
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentState !== this.props.currentState) {
      if (this.props.currentState === STATES.close) {
        this.goToCloseState();
      } else if (this.props.currentState === STATES.back) {
        this.goToBackState();
      } else {
        this.goToIdleState();
      }
    }
  }

  checkIsIdleState = () => {
    return this.props.currentState !== STATES.close && this.props.currentState !== STATES.back;
  };

  goToCloseState = () => {
    animate.killTweensOf(this.bars);
    animate.to(this.bars[0], DURATION, { rotation: 45, x: 1, y: 0 });
    animate.to(this.bars[1], DURATION, { scaleX: 0, autoAlpha: 0 });
    animate.to(this.bars[2], DURATION, { rotation: -45, y: 0 });
  };

  goToBackState = () => {
    animate.killTweensOf(this.bars);
    animate.to(this.bars[0], DURATION, { x: -1, y: 10, rotation: -45, scaleX: 0.8 });
    animate.to(this.bars[1], DURATION, { scaleX: 0, autoAlpha: 0 });
    animate.to(this.bars[2], DURATION, { x: 1, y: -9, rotation: 45, scaleX: 0.8 });
  };

  goToIdleState = () => {
    animate.killTweensOf(this.bars);
    animate.to(this.bars, DURATION, { x: 0, y: 0, rotation: 0, scaleX: 1, autoAlpha: 1 });
  };

  handleMouseEnter = e => {
    if (this.checkIsIdleState()) {
      animate.killTweensOf(this.bars);
      animate.to([this.bars[1], this.bars[3]], DURATION, { scaleX: 0.8 });
    }
    this.props.onMouseEnter();
  };

  handleMouseLeave = e => {
    this.checkIsIdleState() && this.goToIdleState();
    this.props.onMouseLeave();
  };

  render() {
    return (
      <Button
        className={classnames(`HamburgerButton`, this.props.className)}
        nodeRef={r => (this.container = r)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.onClick}
        tabIndex={this.props.tabIndex}
        aria-label="Mobile menu button"
      >
        <div className="bars-container">{bars}</div>
      </Button>
    );
  }
}

HamburgerButton.propTypes = checkProps({
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  currentState: PropTypes.string,
  activeState: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
});

HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  activeState: STATES.close,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
};
