import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './DebugGrid';

storiesOf('DebugGrid', module).addWithJSX('Default', () => <Component showForce />);
