import React from 'react';
import PropTypes from 'prop-types';

import checkProps from '../../util/check-props';

export default class Button extends React.PureComponent {
  render() {
    const { nodeRef: ref, component: Component, children, role: buttonRole, ...buttonProps } = this.props;
    const role = Component === 'button' ? buttonRole : 'button';

    return (
      <Component ref={ref} role={role} {...buttonProps}>
        {children}
      </Component>
    );
  }
}

Button.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  nodeRef: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  onClick: PropTypes.func,
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
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string
});

Button.defaultProps = {
  component: 'button'
};
