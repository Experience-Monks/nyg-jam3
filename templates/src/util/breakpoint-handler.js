import store from '../redux';
import settings from '../data/settings';
import { wait } from '../util/basic-functions';
import { setLayout, setIsMobileLayout, setIsPhoneLayout, setIsTabletLayout } from '../redux/modules/layout';

const breakpointHandler = function() {
  const names = {
    mobileLayout: 'mobile-layout',
    phoneLayout: 'phone-layout',
    tabletLayout: 'tablet-layout',
    desktopLayout: 'desktop-layout',
    desktopSmallLayout: 'desktop-layout-sm',
    desktopMediumLayout: 'desktop-layout-md',
    desktopLargeLayout: 'desktop-layout-lg',
    maxWidth: 'max-width'
  };

  const { desktopLargeLayout, desktopMediumLayout, desktopSmallLayout, tabletLayout } = settings;

  const _rules = [
    { className: names.desktopLargeLayout, predicate: w => w >= desktopLargeLayout },
    { className: names.desktopMediumLayout, predicate: w => w < desktopLargeLayout && w >= desktopMediumLayout },
    { className: names.desktopSmallLayout, predicate: w => w < desktopMediumLayout && w >= desktopSmallLayout },
    { className: names.desktopLayout, predicate: w => w >= desktopSmallLayout },
    { className: names.tabletLayout, predicate: w => w >= tabletLayout && w < desktopSmallLayout },
    { className: names.phoneLayout, predicate: w => w < tabletLayout },
    { className: names.mobileLayout, predicate: w => w < desktopSmallLayout }
  ];

  /**
   * Return if the current layout is a phone
   *
   * @returns {Boolean}
   */
  function isPhoneLayout() {
    return _getReduxLayoutInfo().indexOf(names.phoneLayout) > -1;
  }

  /**
   * Return if the current layout is a tablet
   *
   * @returns {Boolean}
   */
  function isTabletLayout() {
    return _getReduxLayoutInfo().indexOf(names.tabletLayout) > -1;
  }

  /**
   * Return if the current layout is a phone or a tablet
   *
   * @returns {Boolean}
   */
  function isMobileLayout() {
    return isPhoneLayout() || isTabletLayout();
  }

  /**
   * Return if the current layout is a desktop
   *
   * @returns {Boolean}
   */
  function isDesktopLayout() {
    return _getReduxLayoutInfo().indexOf(names.desktopLayout) > -1;
  }

  /**
   * Access to the current Redux state layout information
   *
   * @returns {Boolean}
   */
  function _getReduxLayoutInfo() {
    const currentReduxState = store.getState();
    return currentReduxState && currentReduxState.layout ? currentReduxState.layout : [];
  }

  /**
   * Update breakpoints in redux based on the current breakpoints
   *
   * @param {any} [w=window.innerWidth]
   * @param {any} [h=window.innerHeight]
   */
  function update(w = window.innerWidth, h = window.innerHeight) {
    const breakpointsList = _rules.filter(({ className, predicate }) => predicate(w)).map(val => val.className);
    _setBreakpoint(breakpointsList);
  }

  /**
   * Dispatch actions in redux to update the breakpoints
   *
   * @param {any} breakpointsList
   */
  async function _setBreakpoint(breakpointsList) {
    await wait();
    if (!store.getState().layout || store.getState().layout[0] !== breakpointsList[0]) {
      store.getState().layout.forEach(breakpoint => document.documentElement.classList.remove(breakpoint));
      breakpointsList.forEach(breakpoint => document.documentElement.classList.add(breakpoint));
      store.dispatch({
        type: 'BATCH_ACTIONS',
        actions: [
          setIsMobileLayout(breakpointsList.indexOf(names.mobileLayout) > -1),
          setIsPhoneLayout(breakpointsList.indexOf(names.phoneLayout) > -1),
          setIsTabletLayout(breakpointsList.indexOf(names.tabletLayout) > -1),
          setLayout(breakpointsList)
        ]
      });
    }
  }

  return {
    isPhoneLayout,
    isTabletLayout,
    isMobileLayout,
    isDesktopLayout,
    update,
    names
  };
};

const instance = breakpointHandler();
Object.freeze(instance);

export default instance;
