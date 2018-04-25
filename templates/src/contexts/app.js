import React, { PureComponent } from 'react';
const Context = React.createContext();

export class Provider extends PureComponent {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };

  setWindowSize = (windowWidth = this.state.windowWidth, windowHeight = this.state.windowHeight) => {
    this.setState(() => ({ windowWidth, windowHeight }));
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setWindowSize: this.setWindowSize
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export function withProvider(Component) {
  return React.forwardRef((props, ref) => {
    return (
      <Provider>
        <Component {...props} ref={ref} />
      </Provider>
    );
  });
}

export function withConsumer(Component, namespace = 'app') {
  return React.forwardRef((props, ref) => {
    return (
      <Consumer>
        {value => (
          <Component
            {...{
              ...props,
              ...value
            }}
            ref={ref}
          />
        )}
      </Consumer>
    );
  });
}

export default {
  Provider,
  Consumer,
  withProvider,
  withConsumer
};
