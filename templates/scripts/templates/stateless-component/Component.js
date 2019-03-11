import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './{{name}}.scss';

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
