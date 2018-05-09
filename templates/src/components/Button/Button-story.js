import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';
import Component from './Button';

function handleClick() {
  console.log('Click');
}

function handleMouseMove() {
  console.log('Move');
}

storiesOf('Button', module).addWithJSX(
  'Default',
  () => (
    <Component onClick={handleClick} onMouseMove={handleMouseMove} aria-label={text('Aria Label', 'Test Aria Label')}>
      {text('Label', 'Hello')}
    </Component>
  ),
  { notes: 'This is a button' }
);
