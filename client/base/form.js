import React from 'react';
import _ from 'lodash';
import ReactLink from 'react/lib/ReactLink';
import { getValue, updateValue } from 'libs/utils';
import Component from './component';
import lang from '../lang';
import { format } from 'libs/utils';


export default class Form extends Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _linkStateChange (keyPath, value) {
    updateValue(keyPath, value, this.state);
    this.setState(this.state);
  }

  _linkValue (keyPath) {
    return getValue(keyPath, this.state);
  }

  showError (error) {
    if (_.isString(error)) {
      return alert(lang.errors[error]);
    }

    var messages = [];

    for (let key in error) {
      let message = _.capitalize(format(lang.errors[error[key]], key));
      messages.push(message);
    }

    alert(messages.join('\n'));
  }

  handleAPIError (xhr) {
    this.showError('unexpected_error');
  }

  handleSubmit (event) {
    event.preventDefault();
    var model = _.clone(this.state.model);
    this.save(model);
  }

  linkState (keyPath) {
    return new ReactLink(
      this._linkValue.call(this, keyPath),
      this._linkStateChange.bind(this, keyPath)
    );
  }
}
