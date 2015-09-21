import React from 'react';
import Iso from 'iso';
import langs from 'config/langs';
import alt from '../../client/alt';
import Component from '../../client/base/component';


export default {
  renderView (ViewClass, done) {
    Component.prototype.lang = langs[done.req.lang];

    let View = React.createFactory(ViewClass);
    let html = Iso.render(React.renderToString(View()), alt.flush());
    let title = ViewClass.prototype.title();

    done({ title, html });
  },
};
