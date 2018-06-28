import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Footer.css';

import BaseLink from '../BaseLink/BaseLink';

import routeKeys from '../../routes/keys';
import checkProps from '../../util/check-props';

const Footer = React.forwardRef((props, ref) => (
  <footer className={classnames('Footer', props.className)} ref={ref}>
    <section className="footer-global">
      <nav className="footer-nav">
        <ul className="nav-list">
          {props.links.map((link, index) => (
            <li key={index} className="nav-item">
              <BaseLink link={link.path}>{link.name}</BaseLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer-copyright">Jam3 ©</div>
    </section>
  </footer>
));

Footer.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.array
});

Footer.defaultProps = {
  className: '',
  links: [
    {
      name: 'About',
      path: routeKeys.About
    },
    {
      name: 'Privacy',
      path: '#'
    },
    {
      name: 'Terms',
      path: '#'
    }
  ]
};

export default Footer;
