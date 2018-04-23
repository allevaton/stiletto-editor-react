import EventEmitter from 'events';
import invariant from 'invariant';

export default class EngineConnector extends EventEmitter {
  actions;
  cleanupInterval;

  constructor() {
    super();

    this.actions = {};
  }

  // eslint-disable-next-line class-methods-use-this
  dispatch(action) {
    invariant(
      typeof action === 'object',
      'Actions being dispatched to the engine MUST be an object: %s',
      action,
    );

    const meta = action.meta || {};

    return new Promise((resolve, reject) => {
      window.engineQuery({
        ...meta,
        onFailure: (code, message) => reject({ code, message }),
        onSuccess: resolve,
        request: JSON.stringify(action),
      });
    });
  }

  setupSubscriber() {
    // TODO: this needs to change when we have subscription functionality
    //
    // window.engine_subscribe(action => {
    //   const actionHandler = this.actions[action.meta.id];
    //   if (actionHandler) {
    //     actionHandler.done = true;
    //     if (action.error === true) {
    //       return actionHandler.reject(action);
    //     }
    //     return actionHandler.resolve(action);
    //   }
    //   return this.emit('action', action);
    // });
  }
}
