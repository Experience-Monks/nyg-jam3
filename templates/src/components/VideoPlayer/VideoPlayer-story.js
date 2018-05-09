import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean, object } from '@storybook/addon-knobs/react';

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
  .addWithJSX('Cover & Controls', () => (
    <VideoPlayer
      {...this.props}
      src={text('Src', src)}
      poster={text('Poster', poster)}
      style={object('Styles', full)}
      disableBackgroundCover={boolean('Disable Background Cover', false)}
      startTime={number('Start Time', 15)}
      captions={object('Captions', captions)}
    />
  ))
  .addWithJSX('Looping Cover', () => (
    <VideoPlayer
      {...this.props}
      src={text('Src', src)}
      poster={text('Poster', poster)}
      autoPlay={boolean('Autoplay', true)}
      loop={boolean('Loop', true)}
      muted={boolean('Muted', true)}
      hasControls={boolean('Controls', false)}
      style={object('Styles', full)}
      togglePlayOnClick={boolean('Toggle Play on Click', false)}
      disableBackgroundCover={boolean('Disable Background Cover', false)}
      allowKeyboardControl={boolean('Allow Keyboard Control', false)}
    />
  ))
  .addWithJSX('Regular Player', () => (
    <VideoPlayer src={text('Src', src)} poster={text('Poster', poster)} style={object('Styles', regular)} />
  ));
