import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { batchActions, setWindowSize, setLayout } from '../src/redux/modules/app';

import settings from '../src/data/settings';
import usePassiveEvent from '../src/util/use-passive-event';
import layout from '../src/util/layout';

class BreakpointWrap extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize, usePassiveEvent());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.props.setLayout(window.innerWidth, window.innerHeight, layout.all);
  }, settings.resizeDebounceTime);

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          windowWidth: this.props.windowWidth,
          windowHeight: this.props.windowHeight,
          layout: this.props.layout
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    windowWidth: state.windowSize.width,
    windowHeight: state.windowSize.height,
    layout: state.layout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWindowSize: val => dispatch(setWindowSize(val)),
    setLayout: (width, height, layout) => dispatch(batchActions([setWindowSize({ width, height }), setLayout(layout)]))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreakpointWrap);
