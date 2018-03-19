import React from 'react';
import PropTypes from 'prop-types';

import './SvgContainer.css';

import checkProps from '../../util/check-props';

/**
 * @deprecated Create stateless component with the SVG code in JSX
 */
export default class SvgContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(this.props.component, {
      className: this.props.className,
      dangerouslySetInnerHTML: {
        __html: this.props.svg
      }
    });
  }
}

SvgContainer.propTypes = checkProps({
  className: PropTypes.string,
  svg: PropTypes.string,
  component: PropTypes.string
});

SvgContainer.defaultProps = {
  className: 'svg-container',
  svg: 'blank',
  component: 'span'
};
