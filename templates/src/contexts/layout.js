import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';

import usePassiveEvent from '../util/use-passive-event';
import setGlobalFontSize from '../util/set-global-font-size';
import settings from '../data/settings';

const Context = React.createContext();

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

const rules = [
  { className: names.desktopLargeLayout, predicate: w => w >= desktopLargeLayout },
  { className: names.desktopMediumLayout, predicate: w => w < desktopLargeLayout && w >= desktopMediumLayout },
  { className: names.desktopSmallLayout, predicate: w => w < desktopMediumLayout && w >= desktopSmallLayout },
  { className: names.desktopLayout, predicate: w => w >= desktopSmallLayout },
  { className: names.tabletLayout, predicate: w => w >= tabletLayout && w < desktopSmallLayout },
  { className: names.phoneLayout, predicate: w => w < tabletLayout },
  { className: names.mobileLayout, predicate: w => w < desktopSmallLayout }
];

export class Provider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.calculateState(window.innerWidth, window.innerHeight);
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.handleResize, settings.resizeDebounceTime), usePassiveEvent());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, usePassiveEvent());
  }

  handleResize = debounce(() => {
    this.setState(this.calculateState(window.innerWidth, window.innerHeight));
  }, settings.resizeDebounceTime);

  calculateState = (width, height) => {
    const classes = rules.filter(({ className, predicate }) => predicate(width)).map(val => val.className);
    const desktop = classes.includes(names.desktopLayout);

    rules.forEach(({ className }) => {
      if (classes.includes(className)) {
        document.documentElement.classList.add(className);
      } else {
        document.documentElement.classList.remove(className);
      }
    });

    setGlobalFontSize(width, height, desktop);

    return {
      windowWidth: width,
      windowHeight: height,
      layouts: classes,
      mobile: classes.includes(names.mobileLayout),
      phone: classes.includes(names.phoneLayout),
      tablet: classes.includes(names.tabletLayout),
      desktop
    };
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;

export const withProvider = Component =>
  React.forwardRef((props, ref) => (
    <Provider>
      <Component {...props} ref={ref} />
    </Provider>
  ));

export const withConsumer = (Component, mapStateToProps = x => x) =>
  React.forwardRef((props, ref) => (
    <Consumer>{value => <Component {...props} {...mapStateToProps(value)} ref={ref} />}</Consumer>
  ));

export const withContext = (Component, mapStateToProps = x => x) =>
  withProvider(withConsumer(Component, mapStateToProps));

export default {
  Provider,
  Consumer,
  withContext,
  withProvider,
  withConsumer
};
