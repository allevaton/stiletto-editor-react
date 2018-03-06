import { applyMiddleware, compose, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import createReducers from './createReducers';
import engineMiddleware from './engineMiddleware';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export default function configureStore(initialState = {}, engineConnector) {
  const store = createStore(
    createReducers,
    initialState,
    composeEnhancers(
      applyMiddleware(reduxPackMiddleware, engineMiddleware(engineConnector)),
    ),
  );

  return store;
}
