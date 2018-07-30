import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './HamburgerButton.css';

import Button from '../Button/Button';

import animate from '../../util/gsap-animate';
import { noop } from '../../util/basic-functions';

type Props = {
  className: string,
  tabIndex: number,
  currentState: string,
  activeState: string,
  onClick: Function,
  onMouseEnter: Function,
  onMouseLeave: Function
};

type State = {};

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

const DURATION = 0.2;

const bars = [0, 1, 2].map(item => <span key={item} className={`bar ${item}`} />);

export default class HamburgerButton extends PureComponent<Props, State> {
  static defaultProps: Object;
  container: ?HTMLElement;
  bars: ?Array<HTMLElement>;

  componentDidMount() {
    if (this.container) {
      this.bars = [...this.container.querySelectorAll('.bar')];
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
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
    if (this.bars) animate.to(this.bars[0], DURATION, { rotation: 45, x: 1, y: 0 });
    if (this.bars) animate.to(this.bars[1], DURATION, { scaleX: 0, autoAlpha: 0 });
    if (this.bars) animate.to(this.bars[2], DURATION, { rotation: -45, y: 0 });
  };

  goToBackState = () => {
    animate.killTweensOf(this.bars);
    if (this.bars) animate.to(this.bars[0], DURATION, { x: -1, y: 10, rotation: -45, scaleX: 0.8 });
    if (this.bars) animate.to(this.bars[1], DURATION, { scaleX: 0, autoAlpha: 0 });
    if (this.bars) animate.to(this.bars[2], DURATION, { x: 1, y: -9, rotation: 45, scaleX: 0.8 });
  };

  goToIdleState = () => {
    animate.killTweensOf(this.bars);
    animate.to(this.bars, DURATION, { x: 0, y: 0, rotation: 0, scaleX: 1, autoAlpha: 1 });
  };

  handleMouseEnter = (e: SyntheticEvent<>) => {
    if (this.checkIsIdleState()) {
      animate.killTweensOf(this.bars);
      if (this.bars) animate.to([this.bars[1], this.bars[3]], DURATION, { scaleX: 0.8 });
    }
    this.props.onMouseEnter();
  };

  handleMouseLeave = (e: SyntheticEvent<>) => {
    this.checkIsIdleState() && this.goToIdleState();
    this.props.onMouseLeave();
  };

  render() {
    return (
      <Button
        className={classnames(`HamburgerButton`, this.props.className)}
        ref={r => (this.container = r)}
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

HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  activeState: STATES.close,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
};
