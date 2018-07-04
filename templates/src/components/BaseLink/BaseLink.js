import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './BaseLink.css';

import checkProps from '../../util/check-props';

const excludes = ['children', 'download', 'target', 'rel', 'link'];

const externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
const externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;

const BaseLink = React.forwardRef((props, ref) => {
  const Tag = externalLinkRegex.test(props.link) || props.download ? 'a' : Link;

  // clean props
  let componentProps = Object.keys(props).reduce(
    (acc, key) => ([...excludes].indexOf(key) > -1 ? acc : { ...acc, [key]: props[key] }),
    {}
  );

  if (Tag === 'a') {
    componentProps.href = props.link;
    componentProps.download = props.download;

    // set external link attributes
    if (externalSiteRegex.test(props.link) && !props.download) {
      componentProps.target = props.target;
      if (props.target === '_blank') {
        componentProps.rel = props.rel || 'noopener';
      }
    }
  } else {
    // react router Link
    componentProps.to = props.link;
  }

  return (
    <Tag ref={ref} className={classnames('BaseLink', props.className)} {...componentProps}>
      {props.children}
    </Tag>
  );
});

BaseLink.propTypes = checkProps({
  className: PropTypes.string,
  rel: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  download: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClick: PropTypes.func
});

BaseLink.defaultProps = {
  link: '',
  target: '_blank'
};

export default BaseLink;
