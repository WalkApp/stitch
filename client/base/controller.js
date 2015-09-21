import React from 'react';
import alt from '../alt';


export default class Controller {
  constructor () {
    this.xhrs = {};
  }

  setInitData (data) {
    alt.bootstrap(JSON.stringify(data));
  }

  destroy () {
    for (let key in this.xhrs) {
      if (this.xhrs[key] !== 4) {
        this.xhrs[key].abort();
      }
    }
  }

  renderView (View, callback) {
    let view = React.render(<View />, window.appNode, callback);
    window.titleNode.innerText = view.title();
  }
}
