import React, { PureComponent } from 'react';

import './Rotate.css';

import RotateIcon from './assets/rotate.svg';

import checkProps from '../../util/check-props';
import detect from '../../util/detect';
import { preventEvent } from '../../util/basic-functions';
import usePassiveEvent from '../../util/use-passive-event';

export default class RotateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: detect.orientation
    };
  }

  componentDidMount() {
    this.setOrientationParentClass();

    if (detect.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange, usePassiveEvent());
    } else {
      window.addEventListener('resize', this.handleOrientationChange, usePassiveEvent());
    }

    this.container.addEventListener('touchmove', this.preventScrolling, usePassiveEvent());
  }

  componentDidUpdate(prevProps, prevState) {
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
    this.container.removeEventListener('touchmove', this.preventScrolling);
  }

  preventScrolling = e => {
    preventEvent(e);
  };

  setOrientationParentClass = (orientation = this.state.orientation) => {
    orientation === 'landscape'
      ? document.body.classList.add('rotate-screen-visible')
      : document.body.classList.remove('rotate-screen-visible');
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
      <section className="Rotate" style={style} ref={r => (this.container = r)}>
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
