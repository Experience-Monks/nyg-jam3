import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import preloader from 'preloader';

import checkProps from '../../util/check-props';
import animate from '../../util/gsap-animate';
import { noop, wait } from '../../util/basic-functions';
import { setProgress, setReady } from '../../redux/modules/preloader';
import preloadAssets from '../../data/preload-assets';

import './Preloader.css';

import Loader from '../SvgComponents/Loader/Loader';

class Preloader extends React.PureComponent {
  async componentDidMount() {
    await Promise.all([this.setTimer(), this.setLoader()]);
    this.setDone();
  }

  animateOut(onComplete) {
    return animate.to(this.container, 0.3, { autoAlpha: 0, onComplete });
  }

  async setTimer() {
    return await wait(this.props.minDisplayTime);
  }

  setLoader() {
    return new Promise((resolve, reject) => {
      this.loader = preloader(this.props.options);
      this.props.assets.forEach(file => this.add(file));
      this.loader.on('progress', this.onProgress);
      this.loader.on('complete', () => this.onComplete(resolve));
      this.load();
    });
  }

  add(url, options = {}) {
    this.loader.add(url, options);
  }

  load() {
    this.loader.load();
  }

  onProgress = val => {
    this.props.setProgress(val);
  };

  onComplete = done => {
    this.props.setProgress(1);
    done();
  };

  setDone = async () => {
    await this.animateOut();
    this.props.setReady(true);
  };

  render() {
    return (
      <section id="Preloader" ref={r => (this.container = r)}>
        <Loader className="loader-icon" />
      </section>
    );
  }
}

Preloader.propTypes = checkProps({
  className: PropTypes.string,
  assets: PropTypes.array.isRequired,
  setProgress: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  minDisplayTime: PropTypes.number,
  options: PropTypes.object,
  progress: PropTypes.number,
  transitionState: PropTypes.string
});

Preloader.defaultProps = {
  className: '',
  assets: [],
  minDisplayTime: 300, // in milliseconds
  options: {
    xhrImages: false,
    loadFullAudio: false,
    loadFullVideo: false,
    onProgress: noop,
    onComplete: noop
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    progress: state.preloader.progress,
    assets: preloadAssets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProgress: val => dispatch(setProgress(val)),
    setReady: val => dispatch(setReady(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(Preloader);
