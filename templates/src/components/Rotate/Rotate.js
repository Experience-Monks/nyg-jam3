import React, { PureComponent } from 'react';

import './Rotate.css';

import RotateIcon from './assets/rotate.svg';

import checkProps from '../../util/check-props';
import detect from '../../util/detect';
import { preventEvent } from '../../util/basic-functions';
import usePassiveEvent from '../../util/use-passive-event';

type Props = {};

type State = {
  orientation: String
};

export default class RotateScreen extends PureComponent<Props, State> {
  static defaultProps: Object;
  container: ?HTMLElement;

  state = {
    orientation: detect.orientation
  };

  componentDidMount() {
    this.setOrientationParentClass();

    if (detect.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange, usePassiveEvent());
    } else {
      window.addEventListener('resize', this.handleOrientationChange, usePassiveEvent());
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.orientation !== prevState.orientation) {
      this.setOrientationParentClass();
    }
  }

  componentWillUnmount() {
    if (detect.isAndroid) {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.removeEventListener('resize', this.handleOrientationChange);
    }
  }

  preventScrolling = (e: SyntheticEvent<>) => {
    preventEvent(e);
  };

  setOrientationParentClass = (orientation: String = this.state.orientation) => {
    if (document.body && document.body.classList) {
      orientation === 'landscape'
        ? document.body.classList.add('rotate-screen-visible')
        : document.body.classList.remove('rotate-screen-visible');
    }
  };

  handleOrientationChange = () => {
    if (detect.orientation !== this.state.orientation) {
      this.setState({ orientation: detect.orientation });
    }
  };

  render() {
    const visible = this.state.orientation === 'landscape';
    const style = {
      visibility: visible ? 'visible' : 'hidden'
    };

    return (
      <section className="Rotate" style={style} ref={r => (this.container = r)} onTouchMove={this.preventScrolling}>
        <div className="container">
          <img src={RotateIcon} className="rotate-icon" alt="Please rotate your device" />
          <p>
            Please rotate your device<br />into portrait mode.
          </p>
        </div>
      </section>
    );
  }
}

RotateScreen.propTypes = checkProps({});
RotateScreen.defaultProps = {};
