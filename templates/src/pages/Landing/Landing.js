import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { landingLoaded } from '../../redux/actions/landing';

import logo from './assets/logo.svg';
import './Landing.css';

import animate from '../../util/gsap-animate';

class Landing extends React.PureComponent {
  componentDidMount() {
    this.props.landingLoaded(true);
    animate.set(this.container, { autoAlpha: 0 });
    this.animateIn();
  }

  animateIn = () => {
    return Promise.all([animate.to(this.container, 0.2, { autoAlpha: 1 })]);
  };

  render() {
    return (
      <section className={classnames('Landing', this.props.className)} ref={r => (this.container = r)}>
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
