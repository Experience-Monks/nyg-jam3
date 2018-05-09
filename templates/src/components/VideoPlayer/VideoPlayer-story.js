import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoPlayer from './VideoPlayer';
import VideoTimeline from './VideoTimeline/VideoTimeline';
import VideoControls from './VideoControls/VideoControls';

const onTimeUpdate = currentTime => console.log(currentTime);

const poster = 'http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)';
const src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: false, // show by default
  src: process.env.PUBLIC_URL + '/assets/videos/captions-test.vtt'
};

const full = { width: '100vw', height: '100vh' };
const regular = { width: '640px', height: '360px' };

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

storiesOf('VideoPlayer', module)
  .add('Cover video with controls', () => (
    <VideoPlayer
      {...this.props}
      src={src}
      poster={poster}
      style={full}
      disableBackgroundCover={false}
      startTime={15}
      captions={captions}
    />
  ))
  .add('Looping background video', () => (
    <VideoPlayer
      {...this.props}
      src={src}
      poster={poster}
      autoPlay={true}
      loop={true}
      muted={true}
      hasControls={false}
      style={full}
      togglePlayOnClick={false}
      disableBackgroundCover={false}
      allowKeyboardControl={false}
    />
  ))
  .add('Basic player', () => <VideoPlayer src={src} poster={poster} style={regular} />)
  .add('VideoTimeline', () => <VideoTimeline duration={90} currentTime={45} onTimeUpdate={onTimeUpdate} />)
  .add('VideoControls', () => <VideoControlsTest />);
