import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './{{name}}.css';

import checkProps from '../../{{depth}}util/check-props';

export default class {{name}} extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div
        className={classnames(`{{name}}`, this.props.className)}
      >
        {{name}} component
      </div>
    );
  }
}

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {
  className: ''
};
