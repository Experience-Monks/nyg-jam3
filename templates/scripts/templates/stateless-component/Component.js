import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './{{name}}.css';

import checkProps from '../../{{depth}}util/check-props';

const {{name}} = props => {
  const componentProps = {
    className: classnames('{{name}}', props.className)
  };

  return <div {...componentProps}>{{name}} component</div>;
};

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {};

export default {{name}};
