import React from 'react';
import _ from 'lodash';
import ReactLink from 'react/lib/ReactLink';
import { getValue, updateValue } from 'libs/utils';
import Component from './component';


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
