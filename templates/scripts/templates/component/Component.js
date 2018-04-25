import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './{{name}}.css';

import checkProps from '../../{{depth}}util/check-props';

class {{name}} extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div className={classnames(`{{name}}`, this.props.className)}>{{name}} component</div>;
  }
}

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {};

export default {{name}};
