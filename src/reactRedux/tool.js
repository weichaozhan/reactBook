import React, { Component } from 'react';

import StoreContext from './StoreContext';

export const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  class Connect extends Component {
    static contextType = StoreContext;

    constructor(props) {
      super(props);

      this.state = {
        allProps: {}
      };
    }

    componentDidMount() {
      const { subscribe } = this.context.store;
      this._updateToRender();
      subscribe?.(() => this._updateToRender());
    }

    _updateToRender() {
      const { getState, dispatch } = this.context.store;
      const stateProps = mapStateToProps?.(getState?.() ?? {}, this.props) ?? {};
      const dispatchProps = mapDispatchToProps?.(dispatch ?? (() => {}), this.props) ?? {};
      
      this.setState({
        allProps: {
          ...this.state.allProps,
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      });
    }

    render() {
      const { allProps } = this.state;
      return <WrappedComponent {...allProps} />;
    }
  }

  return Connect;
};

export class Provider extends Component {
  render() {
    return <StoreContext.Provider value={this.props.store} >
      {this.props.children}
    </StoreContext.Provider>
  }
}

export function createStore(reducer) {
  let state = undefined;
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}
