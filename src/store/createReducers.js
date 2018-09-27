import { combineReducers } from 'redux';
import engineReducer from '../engine/redux';

export default combineReducers({
  engine: engineReducer,
});
