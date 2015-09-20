import React from 'react';
import ErrorView from '../views/error';



const appNode = document.getElementById('app-node');
const titleNode = document.getElementsByTagName('title')[0];

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
    let view = React.render(View, appNode, callback);
    titleNode.innerText = view.title();
  }

  renderErrorView (xhr) {
    let view = React.render(<ErrorView />, appNode);
    titleNode.innerText = view.title();
  }
}
