import React from 'react';
import alt from '../alt';
import ErrorView from '../views/error';
import NotFoundView from '../views/not_found';


export default class Controller {
  constructor () {
    this.xhrs = {};
  }

  // Fake method for client side
  // wrap all models and collections by this method
  wrapModel (model) {
    return model;
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

  renderErrorView (xhr, done) {
    if (xhr.readyState == 0) return;

    if (xhr.status == 404) {
      this.renderView(NotFoundView, done);
    } else {
      this.renderView(ErrorView, done);
    }
  }
}
