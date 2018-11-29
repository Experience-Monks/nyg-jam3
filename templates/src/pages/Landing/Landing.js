import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './Landing.css';

import BaseLink from '../../components/BaseLink/BaseLink';

import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';
import checkProps from '../../util/check-props';
import { default as Transition } from '../PagesTransitionWrapper';
import { wait } from '../../util/basic-functions';

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setLandingLoaded(true);
    }
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  render() {
    return (
      <section className={classnames('Landing', this.props.className)} ref={el => (this.container = el)}>
        <header className="Landing-header">
          <h1 className="Landing-title">Jam3 Frontend Scaffolding</h1>
        </header>
        <section className="Landing-intro">
          <h2>What is it?</h2>
          <div>
            It's an scaffolding result of the Jam3 Generator. This generator includes many of the modern stack we use
            internally on Jam3 and implement many of the best practices are in our projects
          </div>
        </section>
        <section className="Landing-source">
          <h2>Source code</h2>
          <div>
            The source code of the generator is open source, you can check it out on{' '}
            <BaseLink link="https://github.com/Jam3/nyg-jam3">https://github.com/Jam3/nyg-jam3</BaseLink>
          </div>
        </section>
        <section className="Landing-resources">
          <h2>Resources</h2>
          <div className="container">
            <BaseLink className="resource" link="https://generator.jam3.net/components">
              Components
            </BaseLink>
            <BaseLink className="resource" link="https://generator.jam3.net/styleguide">
              Styleguide
            </BaseLink>
            <BaseLink className="resource" link="https://generator.jam3.net/performance">
              Performance
            </BaseLink>
            <BaseLink className="resource" link="https://generator.jam3.net/bundle">
              Bundle
            </BaseLink>
          </div>
        </section>
      </section>
    );
  }
}

Landing.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setLandingLoaded: PropTypes.func
});

Landing.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.landingLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLandingLoaded: val => dispatch(setLandingLoaded(val))
  };
};

Landing.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Transition(Landing));
