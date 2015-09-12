import $ from 'jquery';
import React from 'react';
import Controller from '../base/controller';
import UserView from '../views/user';
import UpcommingView from '../views/upcomming';
import UserModel from '../models/user';
import PostsCollection from '../models/posts';
import EventsCollection from '../models/events';
import currentUser from '../modules/user';


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
        isOwner: username === currentUser.get('username')
      };

      this.renderView(<UserView data={data}/>, done);
    });
  }

  upcomming (ctx, done) {
    var
      dfd,
      { username } = ctx.params,
      user = new UserModel(),
      events = new EventsCollection();

    user.username = username;
    events.username = username;
    events.order = '-created';

    this.xhrs.user = user.fetch();
    this.xhrs.events = events.fetch();

    dfd = $.when(this.xhrs.user, this.xhrs.events);
    dfd.done(() => {
      var data = {
        user: user.toJSON(),
        events: events.toJSON(),
        isOwner: username === currentUser.get('username')
      };

      this.renderView(<UpcommingView data={data}/>, done);
    });
  }
}
