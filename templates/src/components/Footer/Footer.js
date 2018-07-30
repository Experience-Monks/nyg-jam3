import React from 'react';
import classnames from 'classnames';

import './Footer.css';

import BaseLink from '../BaseLink/BaseLink';

import routeKeys from '../../routes/keys';

type Props = {
  className: string,
  links: Array<Object>
};

/**
 * forwardRef does not currently have a definition.
 * $FlowFixMe
 */
const Footer = React.forwardRef((props: Props, ref) => (
  <footer className={classnames('Footer', props.className)} ref={ref}>
    <nav className="footer-nav">
      <ul className="nav-list">
        {props.links.map((link, index) => (
          <li key={index} className="nav-item">
            <BaseLink link={link.path}>{link.name}</BaseLink>
          </li>
        ))}
      </ul>
    </nav>
    <p className="footer-copyright">Jam3 ©</p>
  </footer>
));

Footer.defaultProps = {
  links: [
    {
      name: 'About',
      path: routeKeys.About
    },
    {
      name: 'Contact',
      path: 'https://www.jam3.com/contact/'
    },
    {
      name: 'Accessibility',
      path: 'https://www.jam3.com/accessibility/'
    }
  ]
};

export default Footer;
