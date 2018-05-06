import React from 'react';

/**
 * Forward props to a component. Currently used because certain libraries
 * are not compatible with React 16.3's forwardRef which has a return type
 * of object.
 *
 * @param {Component} Component
 * @returns {Function}
 */
export default Component => props => <Component {...props} />;
