import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { NamespacesConsumer } from 'react-i18next';

import './LanguageSwitcher.scss';

const LanguageSwitcher = React.memo(
  React.forwardRef((props, ref) => {
    const componentProps = {
      className: classnames('LanguageSwitcher', props.className)
    };

    function onChange(lng, i18n) {
      i18n.changeLanguage(lng);
    }

    return (
      <NamespacesConsumer ns={['default']}>
        {(t, { i18n, ready }) => (
          <div {...componentProps} ref={ref}>
            <select defaultValue={props.lang} onChange={e => onChange(e.target.value, i18n)}>
              <option value="en-US">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        )}
      </NamespacesConsumer>
    );
  })
);

LanguageSwitcher.propTypes = checkProps({
  className: PropTypes.string,
  lang: PropTypes.string
});

LanguageSwitcher.defaultProps = {};

export default LanguageSwitcher;
