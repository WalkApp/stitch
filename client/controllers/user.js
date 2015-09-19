import $ from 'jquery';
import React from 'react';
import Controller from '../base/controller';
import UserView from '../views/user';
import UpcomingView from '../views/upcoming';
import ErrorView from '../views/error';
import UserModel from '../models/user';
import PostsCollection from '../models/posts';
import EventsCollection from '../models/events';
import currentUser from '../modules/user';


export default class UserController extends Controller {
  index (ctx, done) {
    let { username } = ctx.params;
    let user = new UserModel();
    let posts = new PostsCollection();

    user.username = username;
    posts.username = username;
    posts.order = '-created';

    this.xhrs.user = user.fetch();
    this.xhrs.posts = posts.fetch();

    let dfd = $.when(this.xhrs.user, this.xhrs.posts);
    dfd.done(() => {
      let data = {
        user: user.toJSON(),
        posts: posts.toJSON(),
        isOwner: username === currentUser.get('username'),
      };

      this.renderView(<UserView data={data}/>, done);
    })
    .fail(() => {
      this.renderView(<ErrorView />)
    });
  }

  upcoming (ctx, done) {
    let { username } = ctx.params;
    let user = new UserModel();
    let events = new EventsCollection();

    user.username = username;
    events.username = username;
    events.order = '-created';

    this.xhrs.user = user.fetch();
    this.xhrs.events = events.fetch();

    let dfd = $.when(this.xhrs.user, this.xhrs.events);
    dfd.done(() => {
      let data = {
        user: user.toJSON(),
        events: events.toJSON(),
        isOwner: username === currentUser.get('username'),
      };

      this.renderView(<UpcomingView data={data}/>, done);
    });
  }
}
