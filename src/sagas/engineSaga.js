import { channel, delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { engineConnected, engineConnectFailed } from '../engine/redux';

const engineActions = {};

const origins = {
  editor: 'editor',
  engine: 'engine',
};

function engineDispatch(action) {
  window.engineQuery({
    request: JSON.stringify(action),
    persistent: false,
    // Not real response, simply engine-verification
    onSuccess: id => id && (engineActions[id] = action),
    onFailure: (code, errorMessage) => {
      throw new Error(errorMessage);
    },
  });
}

function* engineCallback(rawResponse) {
  const response = JSON.parse(rawResponse);
  const { id, origin } = response;

  if (origin === origins.editor) {
    const action = engineActions[id];

    if (action) {
      // Engine GAVE a response here

      // Merge some data in with the response data so it's interpretable
      // via reducers
      yield put({
        ...response,
        origin,
        originalPayload: action.payload,
        type: action.type,
      });

      // Later, remove the ID
      delete engineActions[id];
    } else {
      // TODO: did something weird happen here?
      // We got an origin editor response, but no corresponding ID
    }
  } else {
    // Engine expects a response here
    // If no ID present, don't send anything back
  }
}

function* ensureEngineConnection() {
  while (true) {
    if (window.engineQuery) {
      return;
    }

    yield put(engineConnectFailed());
    yield call(delay, 60000);
  }
}

export default function* engineSagaManager() {
  yield ensureEngineConnection();

  const engineResponseChannel = channel();

  window.engineQuery({
    request: 'subscribe',
    persistent: true,
    onSuccess(response) {
      engineResponseChannel.put(response);
      // engineCallback(response).next();
    },
    onFailure(error_code, error_message) {},
  });

  yield put(engineConnected());

  yield takeEvery(engineResponseChannel, engineCallback);
  yield takeEvery(action => action.meta && action.meta.engineAction, engineDispatch);
}
