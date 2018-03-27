import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Nav.css';

import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import animate from '../../util/gsap-animate';
import checkProps from '../../util/check-props';
import instance from '../../util/breakpoint-handler';
import settings from '../../data/settings';

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
    this.animateIn();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout !== nextProps) {
      return true;
    }
  }

  animateIn = () => {
    animate.to(this.container, 0.5, { autoAlpha: 1 });
  };

  animateOut = () => {
    animate.to(this.container, 0.5, { autoAlpha: 0 });
  };

  handleHamburgerClick = state => {
    if (state === STATES.close) {
      animate.to(this.mobileContainer, 0.3, { autoAlpha: 1, x: '0%' });
    } else if (state === STATES.idle) {
      animate.to(this.mobileContainer, 0.3, { autoAlpha: 0, x: '100%' });
    }
  };

  getNavList = () => {
    return (
      <ul className="nav-list">
        {this.props.routes.map((route, index) => (
          <li key={index} className="nav-item">
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Fragment>
        <nav id="top-nav" className={this.props.className} ref={r => (this.container = r)}>
          {this.props.logoSrc && (
            <Link to="/" aria-label="jam3 home link">
              <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
            </Link>
          )}
          {instance.isDesktopLayout() && this.getNavList()}
          {instance.isMobileLayout() && <HamburgerButton onClick={this.handleHamburgerClick} />}
        </nav>
        {instance.isMobileLayout() && (
          <nav id="side-nav" className={this.props.className} ref={r => (this.mobileContainer = r)}>
            {this.getNavList()}
          </nav>
        )}
      </Fragment>
    );
  }
}

Nav.propTypes = checkProps({
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  links: PropTypes.array,
  layout: PropTypes.array
});

Nav.defaultProps = {
  className: '',
  logoSrc: `${settings.imagesPath}jam3-logo.png`,
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
    layout: state.layout
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
