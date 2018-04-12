import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoPlayer from './VideoPlayer';

const poster =
  'https://storage.googleapis.com/55f32d182beb33008635b084/_%2F80175070124842ee5eb3b2f8604a2310a361e455-l.jpg?GoogleAccessId=956532172770-27ie9eb8e4u326l89p7b113gcb04cdgd%40developer.gserviceaccount.com&Expires=1523645761&Signature=eHpFzwZGaDvHQLuRUxLSZdJyN85BWEqD8PaIju9dKUrmbHSD1AmCvIWWi%2FKqO1S5X395DPFR42q0M4iZEqd%2Bir%2BnR68rrCyX74jKwgqYRXKnz%2FZxW6Oc8%2FFxuRBpWGIHgV9zHkOKBK56uCNPiZaCLqS5BgbXz34FdH%2FJArdUcSvvSl4ffhJoujbmJGmdOlvdO2Z8QRIJP7kzWPVi%2B4O8wv3Jmn3ZYXvmEEI8%2B25p6DSRjXVCxY4WyVD2Y5upqki1iNkK3qffVh5aIy6NHedohBL1U7cXeKpYshTXghouRT3HHB2pAouOMRu7w29UvMTYcMxpudSy6921hfJFJrBGhA%3D%3D';

const src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: true, // show by default
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
      disableBackgroundCover={false}
      allowKeyboardControl={false}
    />
  ))
  .add('Regular Player', () => <VideoPlayer src={src} poster={poster} style={regular} />);
