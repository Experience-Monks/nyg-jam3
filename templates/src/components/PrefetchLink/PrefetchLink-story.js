import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './PrefetchLink';

storiesOf('PrefetchLink', module).add('Default', () => (
  <Component link="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg" />
));
