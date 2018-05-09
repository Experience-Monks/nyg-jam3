import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs/react';

import VideoTimeline from './VideoTimeline';

const onTimeUpdate = currentTime => console.log(currentTime);

storiesOf('VideoTimeline', module).addWithJSX('Default', () => (
  <VideoTimeline
    duration={number('Duration', 90)}
    currentTime={number('Current Time', 45)}
    onTimeUpdate={onTimeUpdate}
  />
));
