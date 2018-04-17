import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../Button/Button';

import checkProps from '../../util/check-props';
import audio from '../../util/audio';
import './SoundButton.css';

export default class SoundButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const containerStyles = {
      padding: 20
    };

    const buttonStyles = {
      padding: '20px 50px',
      marginRight: 20,
      color: '#fff',
      background: '#000',
      border: '1px solid #fff',
      fontSize: 18
    };

    return (
      <div className={classnames(`SoundButton`, this.props.className)}>
        <div style={containerStyles}>
          <Button
            style={buttonStyles}
            onMouseEnter={() => audio.play('button-rollover')}
            onClick={() => audio.play('button-click')}
          >
            Test single sounds
          </Button>
        </div>
      </div>
    );
  }
}

SoundButton.propTypes = checkProps({
  className: PropTypes.string
});

SoundButton.defaultProps = {
  className: ''
};
