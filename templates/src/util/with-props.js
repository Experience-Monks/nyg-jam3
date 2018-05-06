import React, { forwardRef } from 'react';

/**
 * A HOC that will map props based on propTypes with
 * an optional mapping function
 *
 * @param {object} [propTypes = {}]
 * @returns {function} [mapProps = x => x]
 */

const getPropsFromPropTypes = (propTypes, props) =>
  Object.keys(propTypes).reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

export default (propTypes = {}, mapProps = x => x) => Component =>
  forwardRef((props, ref) => <Component {...getPropsFromPropTypes(propTypes, props)} {...mapProps(props)} ref={ref} />);
