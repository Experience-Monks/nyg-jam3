import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './VideoControls.css';

import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import MutedIcon from './assets/muted.svg';
import UnmutedIcon from './assets/unmuted.svg';
import ExitFullscreenIcon from './assets/exit-fullscreen.svg';
import EnterFullscreenIcon from './assets/enter-fullscreen.svg';
import captionsOnIcon from './assets/captions-on.svg';
import captionsOffIcon from './assets/captions-off.svg';

import VideoTimeline from '../VideoTimeline/VideoTimeline';
import Button from '../../Button/Button';

import checkProps from '../../../util/check-props';
import { noop } from '../../../util/basic-functions';

const VideoControls = props => {
  function formatTime(totalSeconds) {
    const totalSecondsFloat = totalSeconds;
    let minutes = Math.floor(totalSecondsFloat / 60);
    let seconds = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  return (
    <nav className={classnames('VideoControls', props.className)} aria-label="Video Controls">
      <Button
        className="VideoControls-button"
        aria-label={props.isPlaying ? 'Pause Video' : 'Play Video'}
        title={props.isPlaying ? 'Pause Video' : 'Play Video'}
        onClick={props.onPlayToggle}
      >
        <img src={props.isPlaying ? PauseIcon : PlayIcon} alt={props.isPlaying ? 'Pause Icon' : 'Play Icon'} />
      </Button>

      <VideoTimeline
        duration={props.duration}
        currentTime={Number(props.currentTime)}
        onTimeUpdate={props.onTimeUpdate}
      />

      <time className="VideoControls-time" tabIndex="0">
        {formatTime(Number(props.currentTime))}
      </time>

      {props.captions && (
        <Button
          className="VideoControls-button"
          aria-label={props.isShowingCaptions ? 'Hide Captions' : 'Show Captions'}
          title={props.isShowingCaptions ? 'Hide Captions' : 'Show Captions'}
          onClick={props.onCaptionsToggle}
        >
          <img
            src={props.isShowingCaptions ? captionsOnIcon : captionsOffIcon}
            alt={props.isShowingCaptions ? 'Captions On Icon' : 'Captions Off Icon'}
          />
        </Button>
      )}

      <Button
        className="VideoControls-button"
        aria-label={props.isMuted ? 'Unmute Video' : 'Mute Video'}
        title={props.isMuted ? 'Unmute Video' : 'Mute Video'}
        onClick={props.onMuteToggle}
      >
        <img src={props.isMuted ? MutedIcon : UnmutedIcon} alt={props.isMuted ? 'Muted Icon' : 'Unmuted Icon'} />
      </Button>

      <Button
        className="VideoControls-button"
        aria-label={props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
        title={props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
        onClick={props.onFullscreenToggle}
      >
        <img
          src={props.isFullScreen ? ExitFullscreenIcon : EnterFullscreenIcon}
          alt={props.isFullScreen ? 'Fullscreen Mode Icon' : 'Normal Mode Icon'}
        />
      </Button>
    </nav>
  );
};

VideoControls.propTypes = checkProps({
  className: PropTypes.string,
  captions: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  isShowingCaptions: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onPlayToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onFullscreenToggle: PropTypes.func,
  onCaptionsToggle: PropTypes.func,
  onTimeUpdate: PropTypes.func
});

VideoControls.defaultProps = {
  onPlayToggle: noop,
  onMuteToggle: noop,
  onFullscreenToggle: noop,
  onCaptionsToggle: noop,
  onTimeUpdate: noop
};

export default VideoControls;
