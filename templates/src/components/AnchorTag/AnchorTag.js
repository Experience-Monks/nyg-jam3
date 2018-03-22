import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './AnchorTag.css';
import checkProps from '../../util/check-props';
import { noop } from '../../util/basic-functions';

function AnchorTag({ className, href, target, onClick, download, title, children }) {
  return (
    <a
      title={title}
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
      className={classnames(`AnchorTag`, className)}
      download={download}
    >
      {children}
    </a>
  );
}

AnchorTag.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  download: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

AnchorTag.defaultProps = {
  title: '',
  className: '',
  href: '',
  target: '_self',
  onClick: noop,
  download: '',
  children: null
};

export default AnchorTag;
