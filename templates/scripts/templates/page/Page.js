import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';
import animate from '../../util/gsap-animate';

class {{name}} extends React.PureComponent {
  state = {};

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
    this.animateIn();
  }

  componentDidUpdate(prevProps, prevState) {}

  animateIn = () => {
    return Promise.all([animate.to(this.container, 0.2, { autoAlpha: 1 })]);
  };

  render() {
    return (
      <section className={classnames('{{name}}', this.props.className)} ref={r => (this.container = r)}>
        <h1>{{name}}</h1>
      </section>
    );
  }
}

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)({{name}});
