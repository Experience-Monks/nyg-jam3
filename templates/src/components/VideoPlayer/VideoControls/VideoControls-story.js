import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoControls from './VideoControls';

class VideoControlsTest extends React.PureComponent {
  state = {
    currentTime: 80,
    isPlaying: false,
    isMuted: false,
    isFullScreen: false,
    isShowingCaptions: false
  };

  onPlayToggle = () => {
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      console.log(this.state.isPlaying ? 'playing' : 'paused');
    });
  };

  onMuteToggle = () => {
    this.setState({ isMuted: !this.state.isMuted }, () => {
      console.log(this.state.isMuted ? 'muted' : 'unmuted');
    });
  };

  onFullscreenToggle = () => {
    this.setState({ isFullScreen: !this.state.isFullScreen }, () => {
      console.log(this.state.isFullScreen ? 'enter fullscreen' : 'exit fullscreen');
    });
  };

  onCaptionsToggle = () => {
    this.setState({ isShowingCaptions: !this.state.isShowingCaptions }, () => {
      console.log(this.state.isShowingCaptions ? 'captions on' : 'captions off');
    });
  };

  onTimeUpdate = (currentTime, progress) => {
    this.setState({ currentTime: Number(currentTime) }, () => {
      console.log(`current time: ${currentTime}s`);
      console.log(`progress: ${progress}`);
    });
  };

  render() {
    return (
      <VideoControls
        duration={240}
        currentTime={this.state.currentTime}
        isPlaying={this.state.isPlaying}
        isMuted={this.state.isMuted}
        isFullScreen={this.state.isFullScreen}
        isShowingCaptions={this.state.isShowingCaptions}
        captions={true}
        onPlayToggle={this.onPlayToggle}
        onMuteToggle={this.onMuteToggle}
        onFullscreenToggle={this.onFullscreenToggle}
        onCaptionsToggle={this.onCaptionsToggle}
        onTimeUpdate={this.onTimeUpdate}
      />
    );
  }
}

storiesOf('VideoControls', module).add('Default', () => <VideoControlsTest />);
