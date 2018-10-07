import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import './index.css';
import rootSaga from './sagas/rootSaga';
import configureStore from './store/configureStore';

// const engineConnector = new EngineConnector();

const store = configureStore({});

store.runSaga(rootSaga).done.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
});
