import React from 'react';
import { render } from 'react-dom';

import App from '../sections/App';

export default function() {
  const target = document.getElementById('root');

  render(<App />, target);
}
