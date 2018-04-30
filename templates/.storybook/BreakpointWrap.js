import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { setWindowSize } from '../src/redux/modules/app';

import breakpointHandler from '../src/util/breakpoint-handler';
import settings from '../src/data/settings';
import setGlobalFontSize from '../src/util/set-global-font-size';
import usePassiveEvent from '../src/util/use-passive-event';

class BreakpointWrap extends React.PureComponent {
  state = {};
  resize = debounce(this.onResize.bind(this), settings.resizeDebounceTime);

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.resize, usePassiveEvent());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.props.setWindowSize({ width, height });
    breakpointHandler.update(width, height);
    setGlobalFontSize(width, height);
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          windowWidth: this.props.windowWidth,
          windowHeight: this.props.windowHeight
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    windowWidth: state.windowSize.width,
    windowHeight: state.windowSize.height,
    mobileLayout: state.mobileLayout,
    phoneLayout: state.phoneLayout,
    tabletLayout: state.tabletLayout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWindowSize: val => dispatch(setWindowSize(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreakpointWrap);
