import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './AnchorTag.css';
import checkProps from '../../util/check-props';

function AnchorTag({ className, href, target, onClick, download, text }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener' : ''}
      className={classnames(`AnchorTag`, className)}
      download={download}
    >
      {text}
    </a>
  );
}

AnchorTag.propTypes = checkProps({
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  download: PropTypes.bool,
  text: PropTypes.string
});

AnchorTag.defaultProps = {
  className: '',
  href: '',
  target: '_self',
  onClick: f => f,
  download: false,
  text: ''
};

export default AnchorTag;
