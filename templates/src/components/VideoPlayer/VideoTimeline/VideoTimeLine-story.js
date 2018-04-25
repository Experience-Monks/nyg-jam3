import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoTimeline from './VideoTimeline';

const onTimeUpdate = currentTime => console.log(currentTime);

storiesOf('VideoTimeline', module).add('Default', () => (
  <VideoTimeline duration={90} currentTime={45} onTimeUpdate={onTimeUpdate} />
));
