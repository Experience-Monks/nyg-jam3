import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BaseLink } from '@jam3/react-ui';
import prefetch from 'inject-prefetch';
import checkProps from '@jam3/react-check-extra-props';
import fileExtension from 'file-extension';

import routeKeys from '../../routes/keys';

import './PrefetchLink.scss';

const PrefetchLink = React.memo(
  React.forwardRef((props, ref) => {
    function onMouseEnter(e) {
      if (fileExtension(e.target)) {
        // prefetch a resource
        prefetch(e.target);
      } else {
        // prefetch route's js chunk
        const pageKey = Object.keys(routeKeys).find(key => routeKeys[key] === props.link);
        if (pageKey) {
          const chunkUrl = `${window.location.origin}${process.env.REACT_APP_STATIC_URL}${pageKey}.chunk.js`;
          prefetch(chunkUrl);
        }
      }
      props.onMouseEnter && props.onMouseEnter();
    }

    const componentProps = {
      className: classnames('PrefetchLink', props.className),
      ...props
    };

    return <BaseLink {...componentProps} ref={ref} onMouseEnter={onMouseEnter} />;
  })
);

PrefetchLink.propTypes = checkProps({
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
  onClick: PropTypes.func,
  'aria-label': PropTypes.string
});

PrefetchLink.defaultProps = {
  link: '',
  target: '_blank'
};

export default PrefetchLink;
