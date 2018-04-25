import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoPlayer from './VideoPlayer';

const poster = 'http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)';
const src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: false, // show by default
  src: './assets/captions-test.vtt'
};

const full = { width: '100vw', height: '100vh' };
const regular = { width: '640px', height: '360px' };

storiesOf('VideoPlayer', module)
  .add('Cover & Controls', () => (
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
  .add('Looping Cover', () => (
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
  .add('Regular Player', () => <VideoPlayer src={src} poster={poster} style={regular} />);
