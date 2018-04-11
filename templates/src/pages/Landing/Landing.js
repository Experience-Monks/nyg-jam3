import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLandingLoaded } from '../../redux/modules/landing';

import logo from './assets/logo.svg';
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    this.props.setLandingLoaded(true);
  }

  render() {
    return (
      <div className="Landing">
        <header className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h1 className="Landing-title">Welcome to React</h1>
        </header>
        <p className="Landing-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/about">About</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state.currentRoute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLandingLoaded: val => dispatch(setLandingLoaded(val))
  };
};

Landing.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
