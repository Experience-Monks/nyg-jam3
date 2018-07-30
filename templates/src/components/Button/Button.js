import React from 'react';

type Props = {
  style: Object,
  className: string,
  component: string | Function,
  children?: React$Element<*>,
  nodeRef: Function,
  onClick: Function,
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
  role: string,
  tabIndex: number | string,
  disabled: boolean,
  'aria-label': string
};

/**
 * forwardRef does not currently have a definition.
 * $FlowFixMe
 */
const Button = React.forwardRef((props: Props, ref) => {
  const Component = props.component;
  const buttonRole = props.role;
  const role = Component === 'button' ? buttonRole : 'button';
  const { ...buttonProps } = props;

  return (
    <Component ref={ref} role={role} {...buttonProps}>
      {props.children}
    </Component>
  );
});

Button.defaultProps = {
  component: 'button'
};

export default Button;
