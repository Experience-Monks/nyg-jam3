import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './Button';

function handleClick() {
  console.log('Click');
}

function handleMouseMove() {
  console.log('Move');
}

storiesOf('Button', module).add('Default', () => (
  <Component onClick={handleClick} onMouseMove={handleMouseMove} aria-label="Test Aria Label">
    Hello
  </Component>
));
