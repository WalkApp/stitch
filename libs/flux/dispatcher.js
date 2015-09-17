export default class Dispatcher {
  constructor () {
    this._callbacks = [];
  }

  register (callback) {
    this._callbacks.push(callback);
    return this._callbacks.length - 1;
  }

  dispatch (payload) {
    for (let callback of this._callbacks) {
      callback(payload);
    }
  }
}
