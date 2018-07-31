import React from 'react';

type Props = {|
  style?: Object,
  className?: string,
  component: string | Function,
  children?: React$Element<*>,
  role: string,
  'aria-label': string,
  disabled?: boolean,
  tabIndex?: number | string,
  onClick(event: SyntheticEvent<>): ?void,
  onBlur(event: SyntheticEvent<>): ?void,
  onFocus(event: SyntheticEvent<>): ?void,
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
