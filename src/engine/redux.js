import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const engineConnected = createAction('ENGINE_CONNECTED');
export const engineConnectFailed = createAction('ENGINE_CONNECT_FAILED');

const getEngine = state => state.engine;

export const isEngineDead = createSelector(getEngine, engine => engine.status === 'DEAD');

export default handleActions(
  {
    [engineConnected]: state => ({
      ...state,
      status: 'ALIVE',
    }),
    [engineConnectFailed]: state => ({
      ...state,
      status: 'DEAD',
    }),
  },
  {
    status: null,
  },
);
