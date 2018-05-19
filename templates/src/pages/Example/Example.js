import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';

import BaseLink from '../../components/BaseLink/BaseLink';

class Example extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <section className={classnames('Example', this.props.className)}>
        <h1>Example</h1>
        <BaseLink link="/about">About</BaseLink>
      </section>
    );
  }
}

Example.propTypes = checkProps({
  className: PropTypes.string
});

Example.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Example);
