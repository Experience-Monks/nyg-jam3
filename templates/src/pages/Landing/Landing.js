import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { landingLoaded } from '../../redux/actions/landing';

import logo from './assets/logo.svg';
import './Landing.css';

class Landing extends React.PureComponent {
  componentDidMount() {
    this.props.landingLoaded(true);
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
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    landingLoaded: val => dispatch(landingLoaded(val))
  };
};

Landing.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
