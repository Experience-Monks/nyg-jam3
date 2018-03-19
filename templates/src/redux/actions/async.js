import keys from '../keys';

export const testAsync = function(test) {
  return {
    type: keys.TEST_ASYNC,
    test
  };
};
