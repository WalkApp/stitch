import React from 'react';
import Controller from '../base/controller';
import SearchView from '../views/search';
import ErrorView from '../views/error';
import UsersCollection from '../models/users';


export default class SearchController extends Controller {
  index (ctx, done) {
    let q = ctx.query.q;
    let users = new UsersCollection();

    if (q) {
      users.filter = {
        username: { contains: q },
      };
    }

    let dfd = this.xhrs.users = users.fetch();
    dfd.done(() => {
      let data = {
        results: users.toJSON(),
      };

      this.renderView(<SearchView data={data} />, done);
    })
    .fail(() => {
        this.renderView(<ErrorView />)
    });
  }
}
