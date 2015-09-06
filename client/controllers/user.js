import React from 'react';
import Controller from '../base/controller';
import UserView from '../views/user';
import UserModel from '../models/user';


export default class UserController extends Controller {
  index (ctx, done) {
    var
      dfd,
      { username } = ctx.params,
      user = new UserModel({ username });

    dfd = this.xhrs.user = user.fetch();
    dfd.done(() => {
      var data = {
        user: user.toJSON()
      };

      this.renderView(<UserView data={data} />, done);
    });
  }
}
