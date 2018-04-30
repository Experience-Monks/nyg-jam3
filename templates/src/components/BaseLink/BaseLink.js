import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './BaseLink.css';

import checkProps from '../../util/check-props';

const BaseLink = props => {
  const { title, onClick } = props;
  const Tag =
    props.link.includes('://') || props.link.includes('tel:') || props.link.includes('mailto:') || props.download
      ? 'a'
      : Link;

  let componentProps = { className: classnames('BaseLink', props.className), title, onClick };

  if (Tag === 'a') {
    componentProps.href = props.link;

    if (props.download) {
      componentProps.download = props.download;
    } else if (!props.link.includes('tel:') && !props.link.includes('mailto:')) {
      // external link
      componentProps.target = props.target;
      if (props.target === '_blank') {
        componentProps.rel = props.rel || 'noopener';
      }
    }
  } else {
    // react router Link
    componentProps.to = props.link;
  }

  return <Tag {...componentProps}>{props.children}</Tag>;
};

BaseLink.propTypes = checkProps({
  className: PropTypes.string,
  rel: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  onClick: PropTypes.func,
  download: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
});

BaseLink.defaultProps = {
  link: '#',
  target: '_blank'
};

export default BaseLink;
