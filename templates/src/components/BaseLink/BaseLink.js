import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './BaseLink.css';

type Props = {
  className: string,
  rel: string,
  link: string,
  target: '_blank' | '_self',
  tabIndex: number | string,
  download: string,
  title: string,
  children?: React$Element<*>,
  onBlur: Function,
  onFocus: Function,
  onKeyDown: Function,
  onKeyUp: Function,
  onMouseMove: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  onMouseUp: Function,
  onMouseDown: Function,
  onTouchEnd: Function,
  onTouchMove: Function,
  onTouchStart: Function,
  onClick: Function
};

const excludes = ['children', 'download', 'target', 'rel', 'link'];

const externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
const externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;

/**
 * forwardRef does not currently have a definition.
 * $FlowFixMe
 */
const BaseLink = React.forwardRef((props: Props, ref) => {
  const Tag = externalLinkRegex.test(props.link) || props.download ? 'a' : Link;

  // clean props
  let componentProps: any = Object.keys(props).reduce(
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

BaseLink.defaultProps = {
  link: '',
  target: '_blank'
};

export default BaseLink;
