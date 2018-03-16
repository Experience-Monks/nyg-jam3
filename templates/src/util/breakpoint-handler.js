import store from '../redux';
import settings from '../data/settings';
import { wait } from '../util/basic-functions';
import { setLayout, setIsMobileLayout, setIsPhoneLayout, setIsTabletLayout } from '../redux/actions/layout';

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

  function isPhoneLayout() {
    return _getReduxLayoutInfo().includes(names.phoneLayout);
  }

  function isTabletLayout() {
    return _getReduxLayoutInfo().includes(names.tabletLayout);
  }

  function isMobileLayout() {
    return isPhoneLayout() || isTabletLayout();
  }

  function isDesktopLayout() {
    return _getReduxLayoutInfo().includes(names.desktopLayout);
  }

  function _getReduxLayoutInfo() {
    const currentReduxState = store.getState();
    return currentReduxState && currentReduxState.layout ? currentReduxState.layout : [];
  }

  function update(w = window.innerWidth, h = window.innerHeight) {
    const breakpointsList = _rules.filter(({ className, predicate }) => predicate(w)).map(val => val.className);
    _setBreakpoint(breakpointsList);
  }

  async function _setBreakpoint(breakpointsList) {
    await wait();
    if (!store.getState().layout || store.getState().layout[0] !== breakpointsList[0]) {
      store.getState().layout.forEach(breakpoint => document.documentElement.classList.remove(breakpoint));
      breakpointsList.forEach(breakpoint => document.documentElement.classList.add(breakpoint));
      store.dispatch({
        type: 'BATCH_ACTIONS',
        actions: [
          setIsMobileLayout(breakpointsList.includes(names.mobileLayout)),
          setIsPhoneLayout(breakpointsList.includes(names.phoneLayout)),
          setIsTabletLayout(breakpointsList.includes(names.tabletLayout)),
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