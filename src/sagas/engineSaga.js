import { takeEvery, actionChannel } from 'redux-saga/effects';
import uuid from 'uuid';

const engineActions = {};

const origins = {
  editor: 'editor',
  engine: 'engine',
};

function* engineDispatch(action) {
  console.log('Sending action', action);
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
  const { id, origin, payload, type } = response;

  console.log('Got a response', response);

  if (origin === origins.editor) {
    if (engineActions[id]) {
      // Engine GAVE a response here

      console.log('Found the response in our table', id);

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
  return;
}

export default function* engineSagaManager() {
  yield ensureEngineConnection();

  window.engineQuery({
    request: 'subscribe',
    persistent: true,
    onSuccess: response => engineCallback(response).next(),
    onFailure: function(error_code, error_message) {},
  });

  yield takeEvery(
    action => action.meta && action.meta.engineAction,
    engineDispatch,
  );
}
