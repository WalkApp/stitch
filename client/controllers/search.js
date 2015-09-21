import React from 'react';
import Controller from '../base/controller';
import SearchView from '../views/search';
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
      this.setInitData({
        SearchStore: {
          users: users.toJSON(),
        }
      });

      this.renderView(SearchView, done);
    });
  }
}
