import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './HamburgerMenu.css';

import BaseLink from '../BaseLink/BaseLink';

import { setIsMobileMenuOpen } from '../../redux/modules/main-nav';

import checkProps from '../../util/check-props';
import cleanPath from '../../util/clean-path';
import routeKeys from '../../routes/keys';
import animate from '../../util/gsap-animate';

class HamburgerMenu extends React.PureComponent {
  state = {};

  componentDidMount() {
    animate.set(this.container, { x: this.props.isMobileMenuOpen ? '0%' : '100%' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isMobileMenuOpen !== this.props.isMobileMenuOpen) {
      this.props.isMobileMenuOpen ? this.animateIn() : this.animateOut();
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
    }
  }

  componentWillUnmount() {
    this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
  }

  animateIn = () => {
    animate.to(this.container, 0.3, { x: '0%' });
  };

  animateOut = () => {
    animate.to(this.container, 0.3, { x: '100%' });
  };

  render() {
    return (
      <nav className={classnames(`HamburgerMenu`, this.props.className)} ref={r => (this.container = r)}>
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
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isMobileMenuOpen: ownProps.isMobileMenuOpen || state.isMobileMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsMobileMenuOpen: val => dispatch(setIsMobileMenuOpen(val))
  };
};

HamburgerMenu.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.array,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired
});

HamburgerMenu.defaultProps = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu));
