import $ from 'jquery';
import React from 'react';
import Controller from '../base/controller';
import UserView from '../views/user';
import UserModel from '../models/user';
import PostsCollection from '../models/posts';
import currentuser from '../modules/user';


export default class UserController extends Controller {
  index (ctx, done) {
    var
      dfd,
      { username } = ctx.params,
      user = new UserModel(),
      posts = new PostsCollection();

    user.username = username;
    posts.username = username;
    posts.order = '-created';

    this.xhrs.user = user.fetch();
    this.xhrs.posts = posts.fetch();

    dfd = $.when(this.xhrs.user, this.xhrs.posts);
    dfd.done(() => {
      var data = {
        user: user.toJSON(),
        posts: posts.toJSON(),
        isOwner: username === currentuser.get('username')
      };

      this.renderView(<UserView data={data} />, done);
    });
  }
}
