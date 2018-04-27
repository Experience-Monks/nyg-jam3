import React, { PureComponent } from 'react';
const Context = React.createContext();

export class Provider extends PureComponent {
  state = {};

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

export const withConsumer = Component =>
  React.forwardRef((props, ref) => <Consumer>{value => <Component {...props} {...value} ref={ref} />}</Consumer>);

export const withContext = Component => {
  return withProvider(withConsumer(Component));
};

export default {
  Provider,
  Consumer,
  withContext,
  withProvider,
  withConsumer
};
