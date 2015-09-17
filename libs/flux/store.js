import _ from 'lodash';
import { Events } from 'backbone';
import { getValue, updateValue } from 'libs/utils';


export default class Store {
  constructor () {
    this._events = _.assign({}, Events);
    this._attributes = {};
    this.handleDispatch = this.handleDispatch.bind(this);
  }

  get (keypath) {
    return getValue(keypath, this._attributes);
  }

  set (keypath, value) {
    updateValue(keypath, value, this._attributes);
  }

  onChange (...args) {
    this._events.on('change', ...args);
  }

  offChange (...args) {
    this._events.off('change', ...args);
  }

  handleDispatch (payload) {
    var handler = this[payload.actionType];

    if (!handler) {
      return;
    }

    handler(payload);
    this._events.trigger('change');
  }
}
