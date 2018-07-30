import React from 'react';
import classnames from 'classnames';

import Button from '../Button/Button';

import './CloseButton.css';

type Props = {
  style: Object,
  className: string,
  children: React$Element<*>,
  component: string | Function,
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
