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
}

Component.prototype.cx = classnames;
