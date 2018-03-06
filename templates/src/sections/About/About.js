import React, { Component } from 'react';
import { connect } from 'react-redux';

import './About.css';

class About extends Component {
  render() {
    return <div className="About">About page</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state.currentRoute
  };
};

About.defaultProps = {};

export default connect(mapStateToProps, null)(About);
