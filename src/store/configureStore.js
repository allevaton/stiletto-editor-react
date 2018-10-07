import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxDevTools from '../components/DevTools/ReduxDevTools';
import createReducers from './createReducers';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [applyMiddleware(sagaMiddleware)];

  let composeEnhancers = compose;

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  } else {
    enhancers.push(ReduxDevTools.instrument());
  }

  const store = createStore(createReducers, initialState, composeEnhancers(...enhancers));

  store.runSaga = sagaMiddleware.run;

  return store;
}
