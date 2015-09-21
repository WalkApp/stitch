import _ from 'lodash';
import Backbone from 'backbone';
import ClientRouter from '../client/router';
import ClientController from '../client/base/controller';
import { sync } from './mixins/network';
import { renderView } from './mixins/isomorphic';
import langs from 'config/langs';
import config from 'config';
import env from 'libs/env';


Backbone.Model.prototype.sync = Backbone.Collection.prototype.sync = sync;
ClientController.prototype.renderView = renderView;

export default class Router extends ClientRouter {
  run (app) {
    this._app = app;

    if (this.middleware) {
      this.middleware();
    }

    if (this.redirect) {
      this.redirect();
    }

    if (this.router) {
      this.router();
    }
  }

  use (...args) {
    this._app.get(...args);
  }

  redirect () {

  }

  route (url, action) {
    let temp = action.split('.');
    let method = temp[1];
    let Controller = this.controllers[temp[0]];

    if (!Controller) {
      throw new Error(`undefined controller "${temp[0]}"`);
    }

    this._app.get(url, (req, res, next) => {
      let ctor = new Controller();

      if (!ctor[method]) {
        throw new Error(`undefined method "${method}" of "${temp[0]}" controller`);
      }

      let cb = function (data) {
        res.locals.env.lang = req.lang;

        data.config = config._client;
        data.env = env.toJSON();
        data.langs = _.pick(langs, [res.locals.lang])

        res.render('layout', data);
      };

      cb.req = req;
      cb.res = res;

      ctor[method](req, cb);
    });
  }
}

Router.prototype.auth = require('./middlewares/auth');
Router.prototype.notAuth = require('./middlewares/not_auth');
