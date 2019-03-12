import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './PrefetchLink';

import logo from '../../assets/images/jam3-logo.png';

storiesOf('PrefetchLink', module)
  .add('Default', () => <Component link={logo}>Resource link</Component>)
  .add('Download', () => (
    <Component download link={logo}>
      Download link
    </Component>
  ));
