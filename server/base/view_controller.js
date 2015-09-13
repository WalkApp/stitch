import _ from 'lodash';
import React from 'react';
import Controller from './controller';
import langs from 'config/langs';
import config from 'config';
import env from 'libs/env';


export default class ViewController extends Controller {
  renderEmptyView (req, res, viewName) {
    let ViewClass = require(`../../client/views/${viewName}`);

    res.render('layout', {
      config: config._client,
      env: env.toJSON(),
      langs: _.pick(langs, [req.lang]),

      title: ViewClass.prototype.title(),
      body: '',
    });
  }

  renderView (req, res, viewName, data) {
    let ViewClass = require(`../../client/views/${viewName}`);
    let View = React.createFactory(ViewClass);
    let html = React.renderToString(View(data));

    res.render('layout', {
      config: config._client,
      env: env.toJSON(),
      langs: _.pick(langs, [req.lang]),

      title: ViewClass.prototype.title(),
      body: html,
    });
  }
}
