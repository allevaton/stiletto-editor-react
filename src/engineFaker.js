import { EventEmitter } from 'events';

class EngineFaker extends EventEmitter {
  dispatch(action) {
    setTimeout(() => {
      this.emit('action', action);
    }, 1000);
  }
}

const engine = new EngineFaker();

window.engine_dispatch = action => {
  engine.dispatch(action);
};

window.engine_subscribe = callback => {
  engine.on('action', callback);
};
