import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../Button/Button';

import checkProps from '../../util/check-props';
import './CloseButton.css';

export default class CloseButton extends React.PureComponent {
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

CloseButton.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  nodeRef: PropTypes.func,
  children: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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

CloseButton.defaultProps = {
  component: 'button'
};
