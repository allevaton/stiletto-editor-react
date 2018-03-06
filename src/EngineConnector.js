import EventEmitter from 'events';
import warning from 'warning';
import { v4 } from 'uuid';
import actionHasMeta from './util/actionHasMeta';

export default class EngineConnector extends EventEmitter {
  actions;
  cleanupInterval;

  constructor() {
    super();

    this.actions = {};
  }

  dispatch(action) {
    if (actionHasMeta(action)) {
      action.meta.id = v4();
    } else {
      action.meta = { id: v4() };
    }

    return new Promise((resolve, reject) => {
      this.actions[action.meta.id] = {
        dispatchedAction: action,
        reject,
        resolve,
      };

      window.engine_dispatch(action);
    });
  }

  setupSubscriber() {
    window.engine_subscribe(action => {
      const actionHandler = this.actions[action.meta.id];
      if (actionHandler) {
        actionHandler.done = true;

        if (action.error === true) {
          return actionHandler.reject(action);
        }

        return actionHandler.resolve(action);
      }

      return this.emit('action', action);
    });
  }
}
