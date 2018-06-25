import '../src/util/polyfills';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {}
    };
  };
