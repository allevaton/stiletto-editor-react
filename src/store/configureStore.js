import { applyMiddleware, compose, createStore } from 'redux';
import createReducers from './createReducers';
import engineMiddleware from './engineMiddleware';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose;

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createReducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  store.runSaga = sagaMiddleware.run;

  return store;
}
