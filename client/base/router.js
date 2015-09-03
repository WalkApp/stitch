import React from 'react';
import page from 'page';
import vent from '../modules/vent';


export default class Router {
  constructor () {
    this.appNode = document.getElementById('app-node');
    this.titleNode = document.getElementsByTagName('title')[0];
    this.page = page;

    this.use('*', this.createQuery);

    if (this.middleware) {
      this.middleware();
    }

    if (this.redirect) {
      this.redirect();
    }

    if (this.router) {
      this.router();
    }

    this.page.start();

    vent.on('routeTo', (...args) => this.routeTo(...args))
  }

  routeTo (...args) {
    this.page(...args);
  }

  route (url, callback) {
    this.page(url, (ctx) => {
      this.beforeRoute(ctx);

      if (callback.length > 1) {
        callback(ctx, () => this.afterRoute(ctx));
      } else {
        callback(ctx);
        this.afterRoute(ctx);
      }
    });
  }

  use (...args) {
    this.page(...args);
  }

  beforeRoute (ctx) {
    vent.trigger('route:before', ctx);
  }

  afterRoute (ctx) {
    vent.trigger('route:after', ctx);
  }

  createQuery (ctx, next) {
    var
      query = {},
      params = ctx.querystring.split('&');

    for (let [index, param] of params.entries()) {
      param = param.split('=');
      query[param[0]] = param[1];
    }

    ctx.query = query;
    next();
  }

  renderView (View, callback) {
    var view = React.render(View, this.appNode, callback);
    this.titleNode.innerText = view.title();
  }
}
