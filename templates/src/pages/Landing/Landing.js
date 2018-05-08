import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setLandingLoaded } from '../../redux/modules/landing';

import logo from './assets/logo.svg';
import './Landing.css';

import BaseLink from '../../components/BaseLink/BaseLink';

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { in: true };
  }

  componentDidMount() {
    this.props.setLandingLoaded(true);
  }

  componentWillUnmount() {
    this.setState({ in: false });
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
        <BaseLink link="/about">About</BaseLink>
        <br />
        <BaseLink link="/example">Example</BaseLink>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setLandingLoaded: val => dispatch(setLandingLoaded(val))
  };
};

Landing.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
