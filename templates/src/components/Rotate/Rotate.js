import React, { PureComponent } from 'react';

import './Rotate.css';

import RotateIcon from './assets/rotate.svg';

import checkProps from '../../util/check-props';
import detect from '../../util/detect';

export default class RotateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: detect.orientation
    };
    document.body.classList.add(detect.orientation);
  }

  componentDidMount() {
    if (detect.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.addEventListener('resize', this.handleOrientationChange);
    }
  }

  componentWillUnmount() {
    if (detect.isAndroid) {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.removeEventListener('resize', this.handleOrientationChange);
    }
  }

  handleOrientationChange = () => {
    if (detect.orientation !== this.state.orientation) {
      this.setState({ orientation: detect.orientation });
    }
  };

  render() {
    const visible = this.state.orientation !== 'portrait';
    const style = {
      visibility: visible ? 'visible' : 'hidden'
    };

    if (visible) {
      document.body.classList.add('rotatescreen-visible');
    } else {
      document.body.classList.remove('rotatescreen-visible');
    }

    return (
      <section className="Rotate" style={style}>
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
