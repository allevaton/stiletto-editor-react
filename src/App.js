import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import DevToolsDetector from './DevToolsDetector';

const engineAction = action => {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    action.meta._engineAction = true;
  } else {
    action.meta = { _engineAction: true };
  }

  return action;
};

class App extends Component {
  handleEngineAction = async () => {
    try {
      const response = await this.props.engineAction();
      console.log('Engine came back with:', response);
    } catch (error) {
      console.error('Engine threw an error on this action:', error);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.devToolsOpen !== this.state.devToolsOpen;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <button onClick={this.props.decrement}>Decrement</button>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.handleEngineAction}>Engine Action</button>
        </p>

        <DevToolsDetector
          error={() => (
            <div>
              Error. Make sure you are running this in the Editor window <br />
            </div>
          )}
          render={(open, url) => {
            if (open) return null;

            return (
              <p>
                <button
                  onClick={() => {
                    window.open(url);
                  }}
                >
                  Open DevTools
                </button>
              </p>
            );
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  decrement: () => dispatch({ type: 'DECREMENT' }),
  engineAction: () => dispatch(engineAction({ type: 'ENGINE_ACTION' })),
  increment: () => dispatch({ type: 'INCREMENT' }),
});

export default connect(null, mapDispatchToProps)(App);
