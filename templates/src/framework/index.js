import React from 'react';
import { render } from 'react-dom';

import App from '../sections/App/App';

import detect from '../util/detect';

export default function() {
  const target = document.getElementById('root');
  document.body.className = [...document.body.className.split(' '), ...detect.classes].join(' ');

  render(<App />, target);
}
