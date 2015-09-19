import React from 'react';
import _ from 'lodash';
import ReactLink from 'react/lib/ReactLink';
import error from '../modules/error';
import { getValue, updateValue } from 'libs/utils';
import Component from './component';
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

  showError (code) {
    let message = error(code);
    this.showValidationMessage(message);
  }

  showValidationMessage (message) {
    this.setState({validationMessage: message});
    this.forceUpdate();
  }

  handleAPIError (xhr) {
    let response = xhr.responseJSON;

    var messages = [];
    var hasFields = _.has(response, 'error.fields');
    if (hasFields) {
      _.forEach(response.error.fields, function (field) {
        messages.push(field.message);
      });
    } else {
      messages.push(response.error.message);
    }

    this.showValidationMessage(messages.join('\n'));
  }

  handleSubmit (event) {
    event.preventDefault();

    let model = _.clone(this.state.model);
    this.save(model);
  }

  linkState (keyPath) {
    return new ReactLink(
      this._linkValue.call(this, keyPath),
      this._linkStateChange.bind(this, keyPath)
    );
  }
}
