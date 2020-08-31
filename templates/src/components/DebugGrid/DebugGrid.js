import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import checkProps from '@jam3/react-check-extra-props';

import './DebugGrid.scss';

import gridData from '../../data/grid';

const DebugGrid = React.memo(
  React.forwardRef(({ className, forceShow, layout }, ref) => {
    const visible = useRef(/grid/.test(window.location.search) || forceShow);
    const [grid, setGrid] = useState({});

    useEffect(() => {
      let columns, gutter;
      if (layout.xlarge) {
        columns = gridData['xlarge-max-columns'];
        gutter = gridData['xlarge-gutter'];
      } else if (layout.large) {
        columns = gridData['large-max-columns'];
        gutter = gridData['large-gutter'];
      } else if (layout.medium) {
        columns = gridData['medium-max-columns'];
        gutter = gridData['medium-gutter'];
      } else {
        columns = gridData['small-max-columns'];
        gutter = gridData['small-gutter'];
      }
      setGrid({ columns, gutter });
    }, [layout]);

    return (
      <div className={classnames('DebugGrid', className, { visible: visible.current })} ref={ref}>
        <div className="container">
          {grid &&
            Array.from({ length: grid.columns }).map((_, index) => (
              <div key={index} className={classnames('column', { gutter: grid.gutter })} />
            ))}
        </div>
      </div>
    );
  })
);

DebugGrid.propTypes = checkProps({
  className: PropTypes.string,
  layout: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  forceShow: PropTypes.bool
});

DebugGrid.defaultProps = {};

const mapStateToProps = state => {
  return {
    layout: state.layout
  };
};

export default connect(mapStateToProps)(DebugGrid);
