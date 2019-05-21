import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BaseLink } from '@jam3/react-ui';
import prefetch from 'inject-prefetch';
import checkProps from '@jam3/react-check-extra-props';

import routeKeys from '../../routes/keys';

import './PrefetchLink.scss';

const PrefetchLink = React.memo(
  React.forwardRef((props, ref) => {
    function getFileExtension(filename) {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    }

    function onMouseEnter() {
      props.onMouseEnter && props.onMouseEnter();

      if (!props.download) {
        if (getFileExtension(props.link)) {
          // prefetch a resource
          prefetch(props.link);
        } else {
          // prefetch route's js chunk
          const pageKey = Object.keys(routeKeys).find(key => routeKeys[key] === props.link);
          if (pageKey) {
            const chunkUrl = `${window.location.origin}${process.env.REACT_APP_STATIC_URL}${pageKey}.chunk.js`;
            prefetch(chunkUrl);
          }
        }
      }
    }

    const componentProps = {
      ...props,
      className: classnames('PrefetchLink', props.className),
      ref,
      onMouseEnter
    };

    return <BaseLink {...componentProps} />;
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
