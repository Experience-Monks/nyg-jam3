import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import compose from '../../util/compose';
import forwardProps from '../../util/forward-props';
import { withContext } from '../../contexts/landing';
import { noop } from '../../util/basic-functions';
import logo from './assets/logo.svg';
import './Landing.css';

class Landing extends React.PureComponent {
  componentDidMount() {
    this.props.setLoaded(true);
  }

  render() {
    return (
      <section className={classnames('Landing', this.props.className)}>
        <header className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h1 className="Landing-title">Welcome to React</h1>
        </header>
        <p className="Landing-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/about">About</Link>
      </section>
    );
  }
}

Landing.defaultProps = {
  setLoaded: noop
};

export default compose(withContext, forwardProps)(Landing);
