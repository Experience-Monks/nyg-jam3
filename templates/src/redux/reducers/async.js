import keys from '../keys';

export const async = (state = false, action) => {
  switch (action.type) {
    case keys.TEST_ASYNC:
      return action.test;
    default:
      return state;
  }
};
