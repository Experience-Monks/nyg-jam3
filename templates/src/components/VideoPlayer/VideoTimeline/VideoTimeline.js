import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './VideoTimeline.css';

import checkProps from '../../../util/check-props';
import { noop } from '../../../util/basic-functions';

export default class VideoTimeline extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentTime !== prevState.currentTime && !prevState.isMouseDown) {
      return { currentTime: nextProps.currentTime };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.currentTime,
      isMouseDown: false
    };
  }

  onChange = () => {
    this.props.onTimeUpdate(this.input.value, this.input.value / this.props.duration);
    this.setState({ currentTime: parseFloat(this.input.value) });
  };

  onMouseDown = () => {
    this.setState({ isMouseDown: true });
  };

  onMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  render() {
    const progressStyle = { width: this.state.currentTime / this.props.duration * 100 + '%' };
    return (
      <div
        className={classnames('VideoTimeline', this.props.className)}
        style={this.props.style}
        ref={r => (this.container = r)}
      >
        <div className="VideoTimeline-progress" style={progressStyle} />
        <input
          type="range"
          ref={r => (this.input = r)}
          min="0"
          max={this.props.duration}
          step="0.001"
          onChange={this.onChange}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          value={this.state.currentTime}
          aria-label="Seek Video"
        />
      </div>
    );
  }
}

VideoTimeline.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onTimeUpdate: PropTypes.func
});

VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  onTimeUpdate: noop
};
