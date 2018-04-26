import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';

class About extends React.PureComponent {
  render() {
    return (
      <section className={classnames('About', this.props.className)}>
        <h1>About Page</h1>
      </section>
    );
  }
}

About.propTypes = checkProps({
  className: PropTypes.string
});

About.defaultProps = {};

export default About;
