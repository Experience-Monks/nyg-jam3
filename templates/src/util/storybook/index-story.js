import React from 'react';
import { storiesOf } from '@storybook/react';
import { BaseButton } from 'public-react-ui';

import audio from '../audio';

// ------- Audio util (Howler)
const path = process.env.PUBLIC_URL + '/assets/sounds/';
const manifest = {
  'button-rollover': `${path}button-rollover.mp3`,
  'button-click': `${path}button-click.mp3`,
  'test-sprite': {
    src: `${path}button-sprite.mp3`,
    sprite: {
      'sprite-rollover': [0, 50],
      'sprite-click': [60, 100]
    }
  }
};
audio.extraData = manifest;
const playSound = sound => audio.play(sound);
// ------- End of Audio util

// Entries
storiesOf('Util', module)
  .add('Audio Single Sounds', () => (
    <BaseButton onMouseEnter={() => playSound('button-rollover')} onClick={() => playSound('button-click')}>
      Single Sounds Test
    </BaseButton>
  ))
  .add('Audio Sprite', () => (
    <BaseButton onMouseEnter={() => playSound('sprite-rollover')} onClick={() => playSound('sprite-click')}>
      Sprite Sound Test
    </BaseButton>
  ));
