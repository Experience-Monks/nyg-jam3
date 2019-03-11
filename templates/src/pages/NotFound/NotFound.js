import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { withNamespaces } from 'react-i18next';

import './NotFound.scss';

import { ReactComponent as NotFoundIcon } from '../../assets/svg/not-found-icon.svg';

const NotFound = props => {
  const componentProps = {
    className: classnames('NotFound', props.className)
  };

  const { t } = props;

  return (
    <div {...componentProps}>
      <NotFoundIcon />
      <h1>{t('pages.notFound.header')}</h1>
    </div>
  );
};

NotFound.propTypes = checkProps(
  {
    className: PropTypes.string
  },
  ['tReady', 'i18n', 't', 'lng', 'i18nOptions', 'defaultNS', 'reportNS']
);

NotFound.defaultProps = {
  className: ''
};

export default withNamespaces('default')(NotFound);
