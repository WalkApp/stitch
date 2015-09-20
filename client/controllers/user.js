import $ from 'jquery';
import React from 'react';
import Controller from '../base/controller';
import UserView from '../views/user';
import UpcomingView from '../views/upcoming';
import UserModel from '../models/user';
import PostsCollection from '../models/posts';
import EventsCollection from '../models/events';
import FollowersCollection from '../models/followers';
import currentUser from '../modules/user';


export default class UserController extends Controller {
  index (ctx, done) {
    let { username } = ctx.params;
    let user = new UserModel();
    let posts = new PostsCollection();
    let followers = new FollowersCollection();

    user.username = username;
    posts.username = username;
    posts.order = '-created';
    debugger;
    this.xhrs.user = user.fetch();
    this.xhrs.posts = posts.fetch();
    this.xhrs.followers = followers.fetchCount();


    let dfd = $.when(this.xhrs.followers, this.xhrs.user, this.xhrs.posts);
    dfd.done(() => {
      debugger;
      let data = {
        user: user.toJSON(),
        posts: posts.toJSON(),
        followerCount: followers.count,
        isOwner: username === currentUser.get('username'),
      };

      this.renderView(<UserView data={data}/>, done);
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
