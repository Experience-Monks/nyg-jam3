import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SvgContainer from '../SvgContainer/SvgContainer';

import './NotFound.css';
import notFoundSvg from '-!svg-inline-loader?classPrefix&idPrefix!./assets/404.svg';

import checkProps from '../../util/check-props';

const NotFound = props => {
  const componentProps = {
    className: classnames('NotFound', props.className)
  };

  return (
    <div {...componentProps}>
      <SvgContainer svg={notFoundSvg} component="div" />
      NotFound component
    </div>
  );
};

NotFound.propTypes = checkProps({
  className: PropTypes.string
});

NotFound.defaultProps = {
  className: ''
};

export default NotFound;
