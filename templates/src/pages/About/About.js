import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';
import polished from '../../util/polished';

class About extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <section
        className={classnames('About', this.props.className)}
        style={{ ...polished.size('100%', '100%'), ...polished.zIndex('about') }}
      >
        <h1 style={{ ...polished.gpu(), fontSize: polished.px(30) }}>About</h1>
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
