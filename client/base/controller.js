import React from 'react';

var
  appNode = document.getElementById('app-node'),
  titleNode = document.getElementsByTagName('title')[0];

export default class Controller {
  constructor () {
    this.xhrs = {};
  }

  destroy () {
    for (let key in this.xhrs) {
      if (this.xhrs[key] !== 4) {
        this.xhrs[key].abort();
      }
    }
  }

  renderView (View, callback) {
    var view = React.render(View, appNode, callback);
    titleNode.innerText = view.title();
  }
}
