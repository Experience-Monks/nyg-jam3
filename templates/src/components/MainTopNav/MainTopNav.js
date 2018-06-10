import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MainTopNav.css';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

import logo from '../../assets/images/jam3-logo.png';
import animate from '../../util/gsap-animate';
import checkProps from '../../util/check-props';
import instance from '../../util/breakpoint-handler';

class MainTopNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: STATES.idle
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout !== nextProps.layout) {
      if (nextProps.layout.includes(instance.names.desktopLayout)) {
        this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
      }
      return true;
    }
  }

  handleHamburgerClick = state => {
    this.props.setIsMobileMenuOpen(!this.props.isMobileMenuOpen);

    if (!this.props.isMobileMenuOpen) {
      animate.to(this.mobileContainer, 0.3, { autoAlpha: 1, x: '0%' });
    } else {
      animate.to(this.mobileContainer, 0.3, { autoAlpha: 0, x: '100%' });
    }
  };

  handleLinkClick = e => {
    if (instance.isDesktopLayout()) return;

    this.handleHamburgerClick();
    this.setState({ buttonState: STATES.idle });
  };

  getNavList = () => {
    return (
      <ul className="nav-list">
        {this.props.routes.map((route, index) => (
          <li key={index} className="nav-item">
            <BaseLink link={route.path} onClick={this.handleLinkClick}>
              {route.name}
            </BaseLink>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Fragment>
        <header id="main-top-nav">
          <nav className={this.props.className || null} aria-label="Main Navigation">
            {this.props.logoSrc && (
              <Link to="/" aria-label="jam3 home link">
                <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
              </Link>
            )}
            {instance.isDesktopLayout() && this.getNavList()}
            {instance.isMobileLayout() && (
              <HamburgerButton onClick={this.handleHamburgerClick} state={this.state.buttonState} />
            )}
          </nav>
        </header>
        {instance.isMobileLayout() && (
          <nav
            id="main-side-nav"
            className={this.props.className || null}
            aria-label="Mobile Side Navigation"
            ref={r => (this.mobileContainer = r)}
          >
            {this.getNavList()}
          </nav>
        )}
      </Fragment>
    );
  }
}

MainTopNav.propTypes = checkProps({
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  links: PropTypes.array,
  layout: PropTypes.array,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func
});

MainTopNav.defaultProps = {
  className: '',
  logoSrc: logo,
  logoAlt: 'jam3 logo',
  routes: [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'About',
      path: '/about'
    }
  ]
};

const mapStateToProps = (state, ownProps) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTopNav));
