import { createSelector } from 'reselect';

const getEngine = state => state.engine;

export const isEngineDead = createSelector(
  getEngine,
  engine => engine.status === 'DEAD',
);

export default function engineReducer(
  state = {
    status: 'DEAD',
  },
  action = {},
) {
  return state;
}
