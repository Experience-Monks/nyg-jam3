import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BaseLink } from '@jam3/react-ui';
import prefetch from 'inject-prefetch';
import checkProps from '@jam3/react-check-extra-props';

import routeKeys from '../../routes/keys';
import { prefetchExternalResource } from '../../data/settings';

import './PrefetchLink.scss';

const PrefetchLink = React.memo(
  React.forwardRef((props, ref) => {
    const { className, onMouseEnter, download, link } = props;
    const { prefetchExternalResource, ...filteredProps } = props;

    const getFileExtension = useCallback(filename => {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    }, []);

    const mouseEnter = useCallback(() => {
      onMouseEnter && onMouseEnter();

      if (!download) {
        if (getFileExtension(link)) {
          // prefetch an external resource
          prefetchExternalResource && prefetch(link);
        } else {
          // prefetch route's js chunk
          const pageKey = Object.keys(routeKeys).find(key => routeKeys[key] === link);
          if (pageKey) {
            const chunkUrl = `${window.location.origin}${process.env.REACT_APP_STATIC_URL}${pageKey}.chunk.js`;
            prefetch(chunkUrl);
          }
        }
      }
    }, [onMouseEnter, download, getFileExtension, link, prefetchExternalResource]);

    const componentProps = useMemo(
      () => ({
        ...filteredProps,
        className: classnames('PrefetchLink', className),
        ref,
        onMouseEnter: mouseEnter
      }),
      [filteredProps, className, ref, mouseEnter]
    );

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
  prefetchExternalResource: PropTypes.bool,
  'aria-label': PropTypes.string
});

PrefetchLink.defaultProps = {
  link: 'hey',
  target: '_blank',
  prefetchExternalResource
};

export default PrefetchLink;
