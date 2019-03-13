import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './LanguageSwitcher';

storiesOf('LanguageSwitcher', module).add('Default', () => <Component lang="ru" />);
