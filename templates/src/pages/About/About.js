import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';

import { withConsumer } from '../../contexts/app';

class About extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { windowWidth, windowHeight, setWindowSize } = this.props;

    return (
      <section className={classnames('About', this.props.className)}>
        <h1>About WindowWidth: {windowWidth + '  WindowHeight: ' + windowHeight}</h1>
        <button onClick={() => setWindowSize(windowWidth + 1)}>WindowWidth++</button>
        <button onClick={() => setWindowSize(undefined, windowHeight + 1)}>WindowHeight++</button>
      </section>
    );
  }
}

About.propTypes = checkProps({
  className: PropTypes.string,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  setWindowSize: PropTypes.func
});

About.defaultProps = {};

export default withConsumer(About);
