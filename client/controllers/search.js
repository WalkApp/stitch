import React from 'react';
import Controller from '../base/controller';
import SearchView from '../views/search';
import UsersCollection from '../models/users';


export default class SearchController extends Controller {
  index (ctx, done) {
    var
      dfd,
      q = ctx.query.q,
      users = new UsersCollection();

    if (q) {
      users.filter = {
        username: { contains: q }
      };
    }

    dfd = this.xhrs.users = users.fetch();
    dfd.done(() => {
      var data = {
        results: users.toJSON()
      };

      this.renderView(<SearchView data={data} />, done);
    });
  }
}
