/**
 * Check if there are unused properties or properties that were not set
 *
 * @export
 * @param {any} propTypes
 * @param {any} [ignoreData=[]]
 * @returns {Boolean}
 */
export default function(propTypes, ignoreData = []) {
  const ignoreList = [
    'children',
    'history',
    'location',
    'params',
    'route',
    'routes',
    'routeParams',
    'windowHeight',
    'windowWidth',
    'context',
    'slug',
    'fn',
    'mobileLayout',
    'phoneLayout',
    'tabletLayout',
    'match',
    'staticContext',
    ...ignoreData
  ];

  return {
    ...propTypes,
    fn: function(props, self, componentName) {
      const unspecifiedProps = Object.keys(props).filter(
        prop => !propTypes.hasOwnProperty(prop) && ignoreList.indexOf(prop) === -1
      );

      if (unspecifiedProps.length) {
        throw new TypeError(`Component ${componentName} has unspecified props: ${unspecifiedProps.join(', ')}`);
      }
    }
  };
}
