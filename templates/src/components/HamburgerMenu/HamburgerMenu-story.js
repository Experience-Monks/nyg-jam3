import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './HamburgerMenu';

storiesOf('HamburgerMenu', module).addWithJSX('Default', () => <Component isMobileMenuOpen={true} />);
