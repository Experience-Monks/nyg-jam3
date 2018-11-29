import React from 'react';
import classnames from 'classnames';

import './NotFound.css';

// $FlowFixMe
import NotFoundIcon from '../../components/SvgComponents/NotFoundIcon/NotFoundIcon';

type Props = {
  className?: string
};

const NotFound = (props: Props) => {
  const componentProps = {
    className: classnames('NotFound', props.className)
  };

  return (
    <div {...componentProps}>
      <NotFoundIcon />
      <h1>Not Found</h1>
    </div>
  );
};

NotFound.defaultProps = {};

export default NotFound;
