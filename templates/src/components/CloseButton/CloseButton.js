import React from 'react';
import classnames from 'classnames';

import Button from '../Button/Button';

import './CloseButton.css';

type Props = {|
  style?: Object,
  component?: string | Function,
  className?: string,
  role: string,
  'aria-label': string,
  tabIndex?: number | string,
  disabled?: boolean,
  children?: React$Element<*>,
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
  onTouchStart(event: SyntheticTouchEvent<>): ?void,
|};

export default class CloseButton extends React.PureComponent<Props> {
  static defaultProps: Object;

  render() {
    const { className, ...buttonProps } = this.props;

    return (
      <Button className={classnames('CloseButton', className)} {...buttonProps}>
        <span />
        <span />
      </Button>
    );
  }
}

CloseButton.defaultProps = {
  component: 'button'
};
