import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './PrefetchLink';

import logo from '../../assets/images/jam3-logo.png';

storiesOf('PrefetchLink', module)
  .add('Default', () => <Component link={logo} />)
  .add('Download', () => <Component download link={logo} />);
