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
    var message = error(code);
    alert(message);
  }

  handleAPIError (xhr) {
    this.showError('unexpected_error');
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
