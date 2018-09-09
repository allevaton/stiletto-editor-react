import { spawn } from 'redux-saga/effects';
import engineSagaManager from './engineSaga';

export default function* rootSaga() {
  yield spawn(engineSagaManager);
}
