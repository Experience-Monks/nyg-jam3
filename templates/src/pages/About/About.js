import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';

import BaseLink from '../../components/BaseLink/BaseLink';

class About extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <section className={classnames('About', this.props.className)}>
        <h1>About</h1>
        <BaseLink link="/example">Example</BaseLink>
      </section>
    );
  }
}

About.propTypes = checkProps({
  className: PropTypes.string
});

About.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(About);
