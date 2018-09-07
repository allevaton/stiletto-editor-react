import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App/App';
import EngineConnector from './engine/EngineConnector';

import './index.css';

const engineConnector = new EngineConnector();

const store = configureStore({}, engineConnector);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
