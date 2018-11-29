import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './BaseLink.css';

type Props = {|
  className?: string,
  link: string,
  download?: string,
  title?: string,
  rel?: string,
  target?: '_blank' | '_self',
  tabIndex?: number | string,
  children?: React$Element<*>,
  onBlur(event: SyntheticEvent<>): ?void,
  onFocus(event: SyntheticEvent<>): ?void,
  onClick(event: SyntheticEvent<>): ?void,
  onKeyDown(event: SyntheticKeyboardEvent<>): ?void,
  onKeyUp(event: SyntheticKeyboardEvent<>): ?void,
  onMouseMove(event: SyntheticMouseEvent<>): ?void,
  onMouseEnter(event: SyntheticMouseEvent<>): ?void,
  onMouseLeave(event: SyntheticMouseEvent<>): ?void,
  onMouseUp(event: SyntheticMouseEvent<>): ?void,
  onMouseDown(event: SyntheticMouseEvent<>): ?void,
  onTouchEnd(event: SyntheticTouchEvent<>): ?void,
  onTouchMove(event: SyntheticTouchEvent<>): ?void,
  onTouchStart(event: SyntheticTouchEvent<>): ?void
|};

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
