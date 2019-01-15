import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './{{name}}.scss';

import checkProps from '../../{{depth}}util/check-props';

const {{name}} = React.memo(React.forwardRef((props, ref) => {
  const componentProps = {
    className: classnames('{{name}}', props.className)
  };

  return <div {...componentProps} ref={ref}>{{name}} component</div>;
}));

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {};

export default {{name}};
