import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './NotFound.scss';

import { ReactComponent as NotFoundIcon } from '../../assets/svg/not-found-icon.svg';

import checkProps from '../../util/check-props';

const NotFound = props => {
  const componentProps = {
    className: classnames('NotFound', props.className)
  };

  return (
    <div {...componentProps}>
      <NotFoundIcon />
      <h1>Not Found</h1>
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
