import React, { PureComponent } from 'react';
const Context = React.createContext();

export class Provider extends PureComponent {
  state = {
    loaded: false
  };

  setLoaded = (loaded = this.state.loaded) => {
    this.setState(() => ({ loaded }));
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setLoaded: this.setLoaded
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export const withProvider = Component =>
  React.forwardRef((props, ref) => (
    <Provider>
      <Component {...props} ref={ref} />
    </Provider>
  ));

export const withConsumer = Component => props => <Consumer>{value => <Component {...props} {...value} />}</Consumer>;

export const withContext = Component => withProvider(withConsumer(Component));

export default {
  Provider,
  Consumer,
  withContext,
  withProvider,
  withConsumer
};
