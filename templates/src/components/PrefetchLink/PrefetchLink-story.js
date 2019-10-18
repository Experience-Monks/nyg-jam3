import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './PrefetchLink';

import logo from '../../assets/images/jam3-logo.png';

storiesOf('PrefetchLink', module)
  .add('External link', () => <Component link="https://www.jam3.com">External link</Component>)
  .add('Prefetch external resource', () => (
    <Component link={logo} prefetchExternalResource>
      External resource
    </Component>
  ))
  .add('Download', () => (
    <Component download link={logo}>
      Download link
    </Component>
  ));
