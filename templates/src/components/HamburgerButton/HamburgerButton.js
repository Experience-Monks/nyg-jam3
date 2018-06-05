import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './HamburgerButton.css';

import animate from '../../util/gsap-animate';
import checkProps from '../../util/check-props';
import { noop } from '../../util/basic-functions';

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};
const DURATION = 0.2;

export default class HamburgerButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: props.state,
      isMouseOver: props.isMouseOver
    };
  }

  componentDidMount() {
    this.bars = [...this.container.querySelectorAll('.bar')];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buttonState !== this.props.buttonState) {
      this.setState({ buttonState: nextProps.buttonState });
    }

    if (nextProps.isMouseOver !== this.props.isMouseOver) {
      this.setState({ isMouseOver: nextProps.isMouseOver });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.buttonState !== this.state.buttonState) {
      if (this.state.buttonState === STATES.close) {
        this.goToCloseState();
      } else if (this.state.buttonState === STATES.back) {
        this.goToBackState();
      } else {
        this.goToIdleState();
      }
    }
  }

  checkIsIdleState = () => {
    return this.state.buttonState !== STATES.close && this.state.buttonState !== STATES.back;
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

  handleClick = e => {
    const buttonState = this.state.buttonState === STATES.idle ? this.props.activeState : STATES.idle;
    this.setState({ buttonState });
    this.props.onClick(buttonState);
  };

  handleMouseEnter = e => {
    if (this.checkIsIdleState()) {
      animate.killTweensOf(this.bars);
      animate.to([this.bars[1], this.bars[3]], DURATION, { scaleX: 0.8 });
    }
    this.setState({ isMouseOver: true });
    this.props.onMouseEnter();
  };

  handleMouseLeave = e => {
    this.checkIsIdleState() && this.goToIdleState();
    this.setState({ isMouseOver: false });
    this.props.onMouseLeave();
  };

  render() {
    return (
      <button
        className={classnames(`HamburgerButton`, this.props.className)}
        style={Object.assign({}, this.props.style)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        ref={r => (this.container = r)}
        tabIndex={this.props.tabIndex}
        aria-label="mobile hamburger button"
      >
        <div className="bars-container">{[0, 1, 2].map(item => <span key={item} className={`bar ${item}`} />)}</div>
      </button>
    );
  }
}

HamburgerButton.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  state: PropTypes.string,
  activeState: PropTypes.string,
  isMouseOver: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
});

HamburgerButton.defaultProps = {
  className: '',
  style: {},
  tabIndex: 0,
  state: STATES.idle,
  activeState: STATES.close,
  isMouseOver: false,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
};
