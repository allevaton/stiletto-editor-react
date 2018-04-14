import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import configureStore from './store/configureStore';
import EngineConnector from './EngineConnector';

const engineConnector = new EngineConnector();

const store = configureStore({}, engineConnector);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
