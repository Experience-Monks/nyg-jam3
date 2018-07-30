import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import './MainTopNav.css';

import logo from '../../assets/images/jam3-logo.png';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import routeKeys from '../../routes/keys';
import cleanPath from '../../util/clean-path';

import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

type Props = {
  className?: string,
  logoSrc?: string,
  logoAlt?: string,
  links: Array<Object>,
  layout: Object,
  location: Location,
  isMobileMenuOpen: boolean,
  setIsMobileMenuOpen: Function
};

type State = {
  buttonState: string
};

const getButtonState = (isMenuOpen: boolean): string => (isMenuOpen ? STATES.close : STATES.idle);

class MainTopNav extends React.PureComponent<Props, State> {
  static defaultProps: Object;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const nextButtonState = getButtonState(nextProps.isMobileMenuOpen);
    if (nextButtonState !== prevState.buttonState) {
      return {
        buttonState: nextButtonState
      };
    }
    return null;
  }

  constructor(props: Props) {
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
        <nav className="nav" aria-label="Main Navigation">
          {this.props.logoSrc && (
            <Link to={routeKeys.Landing} aria-label="Home">
              <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
            </Link>
          )}
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

MainTopNav.defaultProps = {
  logoSrc: logo,
  logoAlt: 'logo',
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

// $FlowFixMe
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTopNav));
