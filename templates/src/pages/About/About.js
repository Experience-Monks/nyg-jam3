import React, { Component } from 'react';
import { connect } from 'react-redux';

import { testAsync } from '../../redux/actions/async';

import './About.css';

class About extends Component {
  testAction = () => {
    this.props.testAsync(true);
  };

  render() {
    return (
      <div className="About">
        About page <button onClick={this.testAction}>Dispatch action</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state.currentRoute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testAsync: val => dispatch(testAsync(val))
  };
};

About.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(About);
