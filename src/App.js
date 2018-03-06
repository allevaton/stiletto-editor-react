import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const engineAction = action => {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    action.meta._engineAction = true;
  } else {
    action.meta = { _engineAction: true };
  }

  return action;
};

class App extends Component {
  static x;

  state = {
    isLoading: false,
  };

  handleEngineAction = () => {
    this.setState({ isLoading: true });

    this.props
      .engineAction()
      .then(action => {
        console.log('Engine came back:', action);
      })
      .catch(action => {
        console.log('Engine threw an error on this action:', action);
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

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
        <div>
          <button onClick={this.props.decrement}>Decrement</button>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.handleEngineAction}>Engine Action</button>
        </div>

        {this.state.isLoading && <div>Loading...</div>}
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
