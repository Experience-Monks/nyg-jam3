import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import preloader from 'preloader';

import checkProps from '../../util/check-props';
import animate from '../../util/gsap-animate';
import { noop } from '../../util/basic-functions';
import { setProgress, setReady } from '../../redux/modules/preloader';
import preloadAssets from '../../data/preload-assets';

import './Preloader.css';

import Loader from '../SvgComponents/Loader/Loader';

class Preloader extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
    this.animateIn(); // TODO : remove this line when implementing transition group
    Promise.all([this.setTimer(), this.setLoader()]).then(this.setDone);
  }

  animateIn(onComplete) {
    animate.to(this.container, 0.5, { autoAlpha: 1, onComplete });
  }

  animateOut(onComplete) {
    animate.to(this.container, 0.5, { autoAlpha: 0, onComplete }).then(() => {
      // TODO : remove this line when implementing transition group
      this.props.setReady(true);
    });
  }

  setTimer() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, this.props.minDisplayTime);
    });
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

  get(url) {
    return this.loader.get(url);
  }

  load() {
    this.loader.load();
  }

  stopLoad() {
    this.loader.stopLoad();
  }

  onProgress = val => {
    this.props.setProgress(val);
  };

  onComplete = done => {
    this.props.setProgress(1);
    done();
  };

  setDone = () => {
    // TODO : remove animateOut calling and comment on setReady
    //        when implementing transition group
    this.animateOut();
    // this.props.setReady(true);
  };

  render() {
    return (
      <section id="Preloader" ref={r => (this.container = r)}>
        <Loader className="loader-icon" />
      </section>
    );
  }
}

Preloader.propTypes = {
  className: PropTypes.string,
  assets: PropTypes.array.isRequired,
  setProgress: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  minDisplayTime: PropTypes.number,
  options: PropTypes.object
};

Preloader.defaultProps = checkProps({
  className: '',
  assets: [],
  minDisplayTime: 2000, // in milliseconds
  options: {
    xhrImages: false,
    loadFullAudio: false,
    loadFullVideo: false,
    onProgress: noop,
    onComplete: noop
  }
});

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
