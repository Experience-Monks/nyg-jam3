import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './MainTopNav.scss';

import { ReactComponent as Jam3Logo } from '../../assets/svg/jam3-logo.svg';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import checkProps from '../../util/check-props';
import cleanPath from '../../util/clean-path';
import routeKeys from '../../routes/keys';
import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

const getButtonState = isMenuOpen => (isMenuOpen ? STATES.close : STATES.idle);

class MainTopNav extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextButtonState = getButtonState(nextProps.isMobileMenuOpen);
    if (nextButtonState !== prevState.buttonState) {
      return {
        buttonState: nextButtonState
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonState: getButtonState(props.isMobileMenuOpen)
    };
  }

  handleHamburgerClick = () => {
    this.props.setIsMobileMenuOpen(!this.props.isMobileMenuOpen);
  };

  getNavList = () => {
    return (
      <ul className="nav-list">
        {this.props.links.map((route, index) => (
          <li key={index} className="nav-item">
            <BaseLink
              link={route.path}
              className={classnames({ active: cleanPath(this.props.location.pathname) === cleanPath(route.path) })}
            >
              {route.text}
            </BaseLink>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <header className={classnames('MainTopNav', this.props.className)}>
        <h1 className="only-aria-visible">Site title</h1>
        <nav className="nav" aria-label="Main Navigation">
          <h2 className="only-aria-visible">Navigation</h2>
          <Link to={routeKeys.Landing} aria-label="Home">
            <Jam3Logo className="nav-logo" />
          </Link>
          {this.props.layout.large ? (
            this.getNavList()
          ) : (
            <HamburgerButton onClick={this.handleHamburgerClick} currentState={this.state.buttonState} />
          )}
        </nav>
      </header>
    );
  }
}

MainTopNav.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.array,
  layout: PropTypes.object.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired
});

MainTopNav.defaultProps = {
  links: [
    {
      text: 'Home',
      path: routeKeys.Landing
    },
    {
      text: 'About',
      path: routeKeys.About
    }
  ]
};

const mapStateToProps = state => {
  return {
    layout: state.layout,
    isMobileMenuOpen: state.isMobileMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsMobileMenuOpen: val => dispatch(setIsMobileMenuOpen(val))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainTopNav)
);
