import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';


export default class Component extends React.Component {
  constructor () {
    super();
    this.state = this.initState();
  }

  refreshState () {
    this.setState(this.initState());
  }

  initState () {
    return {};
  }

  trigger (eventName, ...args) {
    eventName = `on${_.capitalize(eventName)}`;

    if (this.props[eventName]) {
      this.props[eventName](...args);
    }
  }
}

Component.prototype.cx = classnames;
