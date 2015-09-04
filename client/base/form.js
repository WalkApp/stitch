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

    if (error.error === 'undefined_fields') {
      var message = format(lang.errors[error.error], error.fields.join(','));
      return alert(message);
    }
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
